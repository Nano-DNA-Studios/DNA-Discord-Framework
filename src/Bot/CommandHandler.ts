import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import BotDataManager from './BotDataManager';
import ICommand from './ICommand';
import Command from './Command';
import ICommandHandler from './ICommandHandler';

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