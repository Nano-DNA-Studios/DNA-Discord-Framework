import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import BotDataManager from '../Data/BotDataManager';
import Command from './Command';
import ICommandHandler from '../Interfaces/ICommandHandler';
import CommandData from '../Data/CommandData';

/**
 * Class Handling Command Execution, and Delegates to Custom Command Handlers (used for the Bot Data to Create the Custom Command handler for a specific Command)
 */
class CommandHandler implements ICommandHandler {

    public async HandleCommand(commandData: CommandData): Promise<void> {
        if (!commandData.CommandInteraction)
            return console.log("Command Interaction is undefined");

        let Factory = await new CommandFactory(commandData.CommandInteraction.commandName);
        let command = await Factory.CreateCommand<Command>(commandData);

        if (command)
            await command.CommandHandler.HandleCommand(commandData);
    }
}

export default CommandHandler;