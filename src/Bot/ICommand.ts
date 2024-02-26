import IDiscordCommand = require("./IDiscordCommand");
import BotDataManager from "./BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';
import ICommandHandler = require("./ICommandHandler");

/**
 * Describes the structure of a command for a Discord Bot
 */
interface ICommand extends IDiscordCommand{

    /**
     * The message to reply with when the command is executed successfully.
     */
    ReplyMessage: string;

    /**
     * Function that is executed when the command is run
     * @param BotDataManager BotDataManager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns void
     */
    CommandFunction: (interaction: ChatInputCommandInteraction<CacheType>, BotDataManager : BotDataManager) => void;

    /**
     * The message to log when the command is executed.
     */
    LogMessage: string;

    /**
     * The error message to display when the command fails.
     */
    ErrorMessage: string;

    /**
     * The success message to display when the command succeeds.
     */
    SuccessMessage: string;

    /**
     * The array of fail messages to display when the command fails.
     */
    FailMessages: string[];

    /**
     * The Custom Command Handler for the command
     * @param BotDataManager Data Manager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns Nothing
     */
    CommandHandler: ICommandHandler;

    RunCommand: (dataManager: BotDataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client) => void;
}

export default ICommand;