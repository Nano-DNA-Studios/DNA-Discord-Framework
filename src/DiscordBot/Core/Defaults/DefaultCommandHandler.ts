import ICommandHandler from "../Interfaces/ICommandHandler";
import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from '../Commands/CommandFactory';
import BotDataManager from "../Data/BotDataManager";
import Command from "../Commands/Command";
import BotCommandLog from "../Logging/BotCommandLog";

/**
 * Default Command Handler used for empty and regular Discord Bot Commands
 */
class DefaultCommandHandler implements ICommandHandler {

    public async HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: BotDataManager): Promise<void> {
        let Factory = await new CommandFactory(interaction.commandName);
        let command = await Factory.CreateCommand<Command>(dataManager);

        if (command) {

            if (dataManager.IsBotCommandBlocked()) {
                command.IsEphemeralResponse = true;
                command.InitializeUserResponse(interaction, "Bot is busy, try the command again later.");
                return;
            }

            if (command.IsCommandBlocking)
                dataManager.BotCommandBlock();

            try {
                await command.RunCommand(client, interaction, dataManager);
            } catch (error) {
                dataManager.BotCommandUnblock();
                if (error instanceof Error)
                    dataManager.AddErrorLog(error);
            }

            dataManager.BotCommandUnblock();
            const log: BotCommandLog = new BotCommandLog(interaction);
            log.AddLogMessage(command.Response);
            dataManager.AddCommandLog(log);
        }
    }

    /**
     * Gets an Instance of the Default Command Handler
     * @returns Returns an Instance of the Default Command Handler
     */
    public static Instance(): DefaultCommandHandler {
        return new DefaultCommandHandler();
    }
}

export default DefaultCommandHandler;