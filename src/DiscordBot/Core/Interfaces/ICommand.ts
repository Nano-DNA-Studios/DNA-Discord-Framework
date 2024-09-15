import IDiscordCommand from "./IDiscordCommand";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, InteractionResponse } from 'discord.js';
import ICommandHandler from "./ICommandHandler";
import BotCommunication from "../Communication/BotCommunication";
import CommandData from "../Data/CommandData";

/**
 * Describes the structure of a command for a Discord Bot
 */
interface ICommand extends IDiscordCommand {

  /**
   * Function that is executed when the command is run
   * @param BotDataManager BotDataManager that contains all Bot Settings
   * @param interaction Interaction instance that triggered running the command
   * @returns void
   */
  RunCommand: (client: Client, interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => void;

  /**
   * The array of fail messages to display when the command fails.
   */
  FailMessages?: string[];

  /**
   * Determines if the Command will Block other Commands from running while it is running
   */
  IsCommandBlocking: boolean;

  /**
   * Boolean Flag determining if the Response to the User will be Ephemeral or Not
   */
  IsEphemeralResponse: boolean;

  /**
   * The Custom Command Handler for the command
   * @param BotDataManager Data Manager that contains all Bot Settings
   * @param interaction Interaction instance that triggered running the command
   * @returns Nothing
   */
  CommandHandler: ICommandHandler;

  /**
   * The Response sent back to the User who called the Command
   */
  Response: BotCommunication;

  /**
   * The Interaction Response Reply Instance that was sent to the User who called the Command
   */
  UserResponse: InteractionResponse | undefined;

  /**
   * Sets the Command Data for the Command
   * @param commandData Command Data to set
   */
  SetCommandData(commandData: CommandData) : void;

  /**
   * Adds a String to the Reply the Bot Sends for a Command
   * @param content The Content to add to the Message
   * @param delayUpdate Whether to delay the update of the Message
   */
  AddToMessage(content: string, delayUpdate: boolean): void;

  /**
   * Adds a File to the Reply the Bot Sends for a Command
   * @param filePath The Path to the File to add to the Message
   * @param delayUpdate Whether to delay the update of the Message
   */
  AddFileToMessage(filePath: string, delayUpdate: boolean): void;

  /**
   * Adds a Message as a Text File to the Reply the Bot Sends for a Command
   * @param content The Content of the Text File
   * @param fileName The Name of the Text File
   * @param delayUpdate Whether to delay the update of the Message
   */
  AddTextFileToMessage(content: string, fileName: string, delayUpdate: boolean): void;
}

export default ICommand;