import CommandHandler from "./CommandHandler";
import CommandRegisterer from "./CommandRegisterer";
import BotData from "./BotData";
import { Client, IntentsBitField } from "discord.js";
import FileSearch from "../FileSearch";
import BotDataManager from "./BotDataManager";
import IDiscordBot from "./IDiscordBot";
import readline, { Interface as ReadLineInterface } from 'readline';

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

        this.BotInstance.on("interactionCreate", async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
            console.log(interaction.commandName);
            new CommandHandler().HandleCommand(interaction, this.BotInstance, this.DataManager);
        });
    }

    /* <inheritdoc> */
    public RegisterCommands(): void {
        let registerer = new CommandRegisterer(this.DataManager);
        let fileSearch = new FileSearch();
        let commands = fileSearch.GetAllCommandInstances();
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

        if (!this.DataManager.SaveFileExists()) {
          this.InitializeBot();
        } else {
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
        await this.RegisterBotToken();
        await this.Login();
        const guilds: string[] = (await this.BotInstance.guilds.fetch()).map(guild => guild.name);
        await this.RegisterGuildName(guilds);
    }

    /* <inheritdoc> */
    public async Login(): Promise<void> {
        try {
            await this.BotInstance.login(this.DataManager.DISCORD_BOT_TOKEN);
        }
        catch (e) {
            throw new Error("Invalid Bot Token, Please check the Bot Token and try again");
        }
    }

    /* <inheritdoc> */
    public async RegisterBotToken(): Promise<void> {
        const setupReader: ReadLineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //Setup Question format
        const prompt = (query: string) => new Promise<string>((resolve) => setupReader.question(query, resolve));

        // Prompt for bot token and guild ID asynchronously
        this.DataManager.DISCORD_BOT_TOKEN = await prompt('Enter the Discord Bot Token: ');

        console.log(`Bot Token: ${this.DataManager.DISCORD_BOT_TOKEN}`);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          
          rl.question('Enter the Discord Bot Token: ', (answer) => {
            console.log(`Received token: ${answer}`);
            rl.close();
          });

        // Close the readline interface after collecting all necessary inputs
        setupReader.close();
    }

    /* <inheritdoc> */
    public async RegisterGuildName(options: string[]): Promise<void> {
        const setupReader: ReadLineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        if (options.length > 1) {
            console.log('\nSelect the Guild Name from the following options:');
            console.log("\n" + options.join('\n') + "\n");

            //Setup Question format
            const prompt = (query: string) => new Promise<string>((resolve) => setupReader.question(query, resolve));

            // Prompt for bot token and guild ID asynchronously
            this.DataManager.GUILD_NAME = await prompt('Enter the Guild Name: ');

        } else
            this.DataManager.GUILD_NAME = options[0];

        // Close the readline interface after collecting all necessary inputs
        setupReader.close();
    }
}

export default DiscordBot;