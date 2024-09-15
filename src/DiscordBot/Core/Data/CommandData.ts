import { CacheType, ChatInputCommandInteraction, Client } from "discord.js";
import BotDataManager from "./BotDataManager";


class CommandData 
{
    public DataManager : BotDataManager;

    public BotClient : Client;

    public CommandInteraction : ChatInputCommandInteraction<CacheType> | undefined;

    constructor(dataManager: BotDataManager, client: Client, interaction: ChatInputCommandInteraction<CacheType> | undefined) {
        this.DataManager = dataManager;
        this.BotClient = client;
        this.CommandInteraction = interaction;
    }
}

export default CommandData;