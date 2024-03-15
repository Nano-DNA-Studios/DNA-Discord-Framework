import { Client } from "discord.js";
import BotDataManager from "../Data/BotDataManager";

/**
 * Interface for an Instance of a Discord Bot
 */
interface IDiscordBot {

    /**
     * Data Manager Instance used for the Bot
     */
    DataManager: BotDataManager;

    /**
     * Client Instance of the Discord Bot
     */
    BotInstance: Client;

    /**
     * Registers the Commands that can be run through the Bot
     */
    RegisterCommands(): void

    /**
     * Gets the Guild ID Based off the Name Provided
     * @param guildName Name of the Guild/Discord Server
     * @returns Guild ID
     */
    GetGuildID(guildName: string): Promise<string>

    /**
     * Starts the Discord Bot
     */
    StartBot(): Promise<void>

    /**
     * Makes the Bot Login by using the Token Provided
     */
    Login(): void

    /**
    * Registers the Bot Token by asking for the Bot Token, Used when the first Instance of the Bot is created
    */
    RegisterBotToken(): void

    /**
     * Registers the Guild Name by asking for the Guild Name, Determines which Server to Connect to
     * @param options Array of Guild Names to choose from
     */
    RegisterGuildName(options: string[]): void

    /**
     * Initializes the Bot by asking for the Bot Token and the Guild Name, and Initializes Data Storage
     */
    InitializeBot(): Promise<void>
}

export default IDiscordBot;