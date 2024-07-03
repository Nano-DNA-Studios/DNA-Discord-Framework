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

            try {
                await command.RunCommand(client, interaction, dataManager);
            } catch (error) {
                if (error instanceof Error)
                    dataManager.AddErrorLog(error);
            }

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