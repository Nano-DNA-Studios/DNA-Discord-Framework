import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import BotDataManager from '../Data/BotDataManager';
import Command from './Command';
import ICommandHandler from '../Interfaces/ICommandHandler';

/**
 * Class Handling Command Execution, and Delegates to Custom Command Handlers
 */
class CommandHandler implements ICommandHandler {

    public async HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, BotDataManager: BotDataManager): Promise<void> {
        let Factory = await new CommandFactory(interaction.commandName);
        let command = await Factory.CreateCommand<Command>();

        if (command)
            await command.CommandHandler.HandleCommand(interaction, client, BotDataManager);
    }
}

export default CommandHandler;