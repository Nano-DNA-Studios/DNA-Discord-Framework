import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import BotDataManager from '../Data/BotDataManager';
import Command from './Command';
import ICommandHandler from '../Interfaces/ICommandHandler';

/**
 * Class Handling Command Execution, and Delegates to Custom Command Handlers (used for the Bot Data to Create the Custom Command handler for a specific Command)
 */
class CommandHandler implements ICommandHandler {

    public async HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: BotDataManager): Promise<void> {
        let Factory = await new CommandFactory(interaction.commandName);
        let command = await Factory.CreateCommand<Command>(dataManager);

        if (command)
            await command.CommandHandler.HandleCommand(interaction, client, dataManager);
    }
}

export default CommandHandler;