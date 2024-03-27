import ICommandHandler from "../Interfaces/ICommandHandler";
import { CacheType, ChatInputCommandInteraction, Client, InteractionResponse, Message } from 'discord.js';
import CommandFactory from '../Commands/CommandFactory';
import BotDataManager from "../Data/BotDataManager";
import Command from "../Commands/Command";
import CommandLogger from '../Logging/CommandLogger';
import BotCommandLog from "../Logging/BotCommandLog";
import BotResponse from "../Response/BotResponse";

/**
 * Default Command Handler used for empty and regular Discord Bot Commands
 */
class DefaultCommandHandler implements ICommandHandler {
   
    public async HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: BotDataManager): Promise<void> {
        let Factory = await new CommandFactory(interaction.commandName);
        let command = await Factory.CreateCommand<Command>();

        if (command) {

            await command.InitializeCommandLogger(interaction, client);
           // await CommandLogger.InitializeResponse(interaction, client, dataManager);

            try {
               // CommandLogger.LogAndRespond(command.LogMessage);

                command.RunCommand(client, interaction, dataManager);
 


                //CommandLogger.LogAndRespond(command.SuccessMessage);
            } catch (error) {
                //CommandLogger.LogAndRespond(command.ErrorMessage + `  (${error})`)
            }

            command.LogAndRespond();

            //dataManager.AddCommandLog(CommandLogger.GetCommandLog(interaction));
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