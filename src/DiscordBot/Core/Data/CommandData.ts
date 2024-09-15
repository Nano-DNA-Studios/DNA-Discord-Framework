import { CacheType, ChatInputCommandInteraction, Client } from "discord.js";
import BotDataManager from "./BotDataManager";

/**
 * Class to store Data that will be passed to a Command
 */
class CommandData 
{
    /**
     * Data Manager for the Bot
     */
    public DataManager : BotDataManager;

    /**
     * Discord Bot Client
     */
    public BotClient : Client;

    /**
     * Command Interaction
     */
    public CommandInteraction : ChatInputCommandInteraction<CacheType>;

    constructor(dataManager: BotDataManager, client: Client, interaction: ChatInputCommandInteraction<CacheType>) {
        this.DataManager = dataManager;
        this.BotClient = client;
        this.CommandInteraction = interaction;
    }
}

export default CommandData;