import CommandHandler from "./Commands/CommandHandler";
import CommandRegisterer from "./Commands/CommandRegisterer";
import BotData from "./Data/BotData";
import { Client, IntentsBitField, TextChannel } from "discord.js";
import FileSearch from "../../FileSearch";
import BotDataManager from "./Data/BotDataManager";
import IDiscordBot from "./Interfaces/IDiscordBot";
import readlineSync from 'readline-sync';
import CommandData from "./Data/CommandData";

/**
 * Represents an instance of a Discord Bot, has default functionality for a Discord Bot but can be extended and add custom functionality with minimal effort
 */
class DiscordBot<T extends BotDataManager> implements IDiscordBot {

    /* <inheritdoc> */
    public DataManager: BotDataManager;

    /* <inheritdoc> */
    public BotInstance: Client;

    /* <inheritdoc> */
    constructor(dataManager: new () => T) {
        this.DataManager = BotData.Instance(dataManager);

        this.BotInstance = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        });

        this.BotInstance.on("ready", (c) => {
            console.log(`Bot is ready ${c.user.tag} on ${this.DataManager.GUILD_NAME}`);
        });

        this.HandleShutDown();

        this.BotInstance.on("interactionCreate", async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
            console.log(interaction.commandName);
            new CommandHandler().HandleCommand(new CommandData(this.DataManager, this.BotInstance, interaction));
        });
    }

    /**
     * Handles the Shut Down Cases
     */
    private HandleShutDown() {
        this.BotInstance.on("shardDisconnect", (c) => {
            console.log(`Bot is shutting down ${this.BotInstance.user?.tag} on ${this.DataManager.GUILD_NAME}`)
            this.DisconnectMessage(this.BotInstance);
        });

        process.on('SIGINT', () => {
            this.BotInstance.destroy();
        });

        process.on('SIGTERM', () => {
            this.BotInstance.destroy();
        });
    }

    /**
     * Sends a Shut Down Message to the last Message Channel the Bot texted in
     * @param client The Discord Bot Client Instance
     */
    private async DisconnectMessage(client: Client<boolean>) {
        try {
            const channel = await this.BotInstance.channels.fetch(this.DataManager.LAST_MESSAGE_CHANNEL_ID);

            if (channel instanceof TextChannel)
                channel.send(`${client.user?.tag} is Shutting Down`)

        } catch (e) {
            if (e instanceof Error)
                this.DataManager.AddErrorLog(e);
            console.log("No Channel Found.")
        }
    }

    /* <inheritdoc> */
    public RegisterCommands(): void {
        let registerer = new CommandRegisterer(this.DataManager);
        let fileSearch = new FileSearch();
        let commands = fileSearch.GetAllCommandInstances(this.DataManager);
        registerer.AddCommands(commands);
        registerer.RegisterCommands();
    }

    /* <inheritdoc> */
    public async GetGuildID(guildName: string): Promise<string> {
        let guildID = "";

        const guilds = await this.BotInstance.guilds.fetch();
        for (const guild of guilds.values()) {
            if (guild.name === guildName) {
                guildID = guild.id;
                break;
            }
        }

        return guildID;
    }

    /* <inheritdoc> */
    public async StartBot(): Promise<void> {

        if (this.DataManager.AutoLoginExists() && !this.DataManager.SaveFileExists()) {
            this.DataManager.DISCORD_BOT_TOKEN = this.DataManager.GetAutoLoginContent();
            await this.InitializeBot();
        }
        else if (!this.DataManager.SaveFileExists()) {
            await this.RegisterBotToken();
            await this.InitializeBot();
        } else {
            this.DataManager.InitializeData();
            await this.DataManager.LoadData();
            await this.Login();
        }

        let guildID = await this.GetGuildID(this.DataManager.GUILD_NAME);
        await this.DataManager.SetGuildID(guildID);
        await this.DataManager.SetClientID(this.BotInstance.user!.id);
        await this.RegisterCommands();
    }

    /* <inheritdoc> */
    public async InitializeBot(): Promise<void> {
        this.DataManager.InitializeData();
        await this.Login();
        const guilds: string[] = (await this.BotInstance.guilds.fetch()).map(guild => guild.name);
        this.RegisterGuildName(guilds);
        this.DataManager.SaveData();
    }

    /* <inheritdoc> */
    public async Login(loginCount: number = 0): Promise<void> {
        try {
            const token = await this.DataManager.DISCORD_BOT_TOKEN;
            await this.BotInstance.login(token);
        }
        catch (e) {
            console.log("Invalid Bot Token, Your Token might be Outdated or incorrect, Please check the Bot Token and try again")

            if (loginCount < 3) {
                this.RegisterBotToken();
                loginCount++;
                await this.Login(loginCount);
            } else {
                let error = new Error("Too Many Incorrect Login Attempts, Shutting Down.");
                this.DataManager.AddErrorLog(error);
                throw error;
            }
        }
    }

    /* <inheritdoc> */
    public RegisterBotToken(): void {
        this.DataManager.DISCORD_BOT_TOKEN = readlineSync.question('Enter the Discord Bot Token: ').replace(/\s/g, '');
    }

    /* <inheritdoc> */
    public RegisterGuildName(options: string[]): void {

        if (options.length > 1) {
            console.log('\nSelect the Guild Name from the following options:');
            console.log("\n" + options.join('\n') + "\n");

            this.DataManager.GUILD_NAME = readlineSync.question('Enter the Guild Name: ').replace(/\s/g, '');
        } else {
            this.DataManager.GUILD_NAME = options[0];
        }

        this.DataManager.SaveData();
    }
}

export default DiscordBot;