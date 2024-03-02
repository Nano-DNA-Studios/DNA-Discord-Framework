import { Client } from "discord.js";
import BotDataManager from "./BotDataManager";

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
}

export default IDiscordBot;