import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import ICommandOption from "../Interfaces/ICommandOption";
import ICommand from "../Interfaces/ICommand";
import IDiscordCommand from "../Interfaces/IDiscordCommand";
import BotDataManager from "../Data/BotDataManager";
import BotData from "../Data/BotData";

/**
 * Registers the commands to the Discord Server
 */
class CommandRegisterer {
    private rest: REST;
    public Commands: IDiscordCommand[] = [];
    private _dataManager: BotDataManager;

    /**
     * Initializes the Command Registerer, by registering the REST API
     */
    constructor(dataManager: BotDataManager) {
        this._dataManager = dataManager;
        this.rest = new REST({ version: "10", timeout: 60000 }).setToken(`${this._dataManager.DISCORD_BOT_TOKEN}`);
    }

    /**
     * Maps the Commands to be Added to Discord Commands and Adds to the List of Commands to be Registered and 
     * @param commands Array of Commands to be Registered
     */
    public AddCommands(commands: ICommand[]): void {
        this.Commands.push(...commands);
    }

    /**
     * Registers the commands to the Discord Server 
     */
    public async RegisterCommands() {
        try {
            console.log('Registering Commands');

            let body =  this.Commands.map(element => ({
                name: element.CommandName,
                description: element.CommandDescription,
                options: element.Options?.map((option: ICommandOption) => ({
                    type: option.type,
                    name: option.name,
                    description: option.description,
                    required: option.required || false,
                    choices: option.choices || []
                }))
            }));

            console.log(`Registering Following Commands: [${body.map(command => command.name).join(', ')}]`);

            await this.rest.put(
                Routes.applicationGuildCommands(
                    this._dataManager.CLIENT_ID!,
                    this._dataManager.GUILD_ID!
                ),
                {
                    body: body
                }
            ).catch((error) => {
                if (error instanceof Error)
                    BotData.Instance(BotDataManager).AddErrorLog(error);
                console.log(`Error Occurred: ${error}`);
            });

            console.log('Commands Registered');
        } catch (error) {
            if (error instanceof Error) 
                BotData.Instance(BotDataManager).AddErrorLog(error);
            console.log(`Error Occurred: ${error}`);
        }
    }
}

export default CommandRegisterer;