import IDiscordCommand from "./IDiscordCommand";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, InteractionResponse } from 'discord.js';
import ICommandHandler from "./ICommandHandler";
import BotResponse from "../Communication/BotResponse";

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
  Response: BotResponse | undefined;

  /**
   * The Interaction Response Reply Instance that was sent to the User who called the Command
   */
  UserResponse: InteractionResponse | undefined;

  /**
   * Initializes and Sends the Response to the User who called the Command, can be Ephermeral or not based on {@link IsEphemeralResponse}
   * @param interaction The interaction instance caused by the Command
   * @param message The First message to send to the User
   */
  //InitializeUserResponse(interaction: ChatInputCommandInteraction<CacheType>, message: string): void;

  /**
   * Adds a String Message in the next line to the Reply created from {@link InitializeUserResponse}
   * @param content The String Content of the Message to add to the Response Sent to the User from {@link InitializeUserResponse}
   */
  //AddToResponseMessage(content: string): void;

  /**
   * Adds a File to the Bots Reply created from {@link InitializeUserResponse}
   * @param filePath The Path to the File Being added
   */
  //AddFileToResponseMessage(filePath: string): void;

  /**
   * Adds a Text File to the Bots Response
   * @param content The String Content of the Text File
   * @param fileName The Name of the Text File (No Extension)
   */
  //AddTextFileToResponseMessage(content: string, fileName: string): void;

  AddToMessage(content: string, delayUpdate: boolean): void;

  AddFileToMessage(filePath: string, delayUpdate: boolean): void;

  AddTextFileToMessage(content: string, fileName: string, delayUpdate: boolean): void;
}

export default ICommand;