import IBotDataManager from "../Interfaces/IBotDataManager";
import fs from 'fs';

import BotCommandLog from "../Logging/BotCommandLog";

/**
 * The Default Bot Data Manager, implementing the bareminimum for a Bot Data Manager
 */
class BotDataManager implements IBotDataManager {

    public LOG_FILE_PATH: string;

    public TEMP_DATA_SAVE_PATH:string;

    public DATA_SAVE_PATH: string;

    public FILE_SAVE_PATH: string;

    public DISCORD_BOT_TOKEN: string = "";

    public GUILD_ID: string = "";

    public GUILD_NAME: string = "";

    public CLIENT_ID: string = "";

    public LOG_CHANNEL_ID: string = "";

    /**
     * Initializes the Data Manager
     * @param botDirectory The Directory that the Bot is located in
     */
    constructor() {
        this.DATA_SAVE_PATH = process.cwd() + '/Resources';
        this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '/data.json';
        this.LOG_FILE_PATH = this.DATA_SAVE_PATH + '/log.txt';
        this.TEMP_DATA_SAVE_PATH = this.DATA_SAVE_PATH + `/temp`
    }

    /**
     * Loads the Data from the File or Registers it by creating the Default Data and file
     */
    public async LoadData() {
        if (this.SaveFileExists()) {
            await this.LoadDataFromFile();
        } 
    }

    /**
     * Initializes the Data by creating the Save Path and the File
     */
    public InitializeData(): void {
        fs.mkdirSync(this.DATA_SAVE_PATH, { recursive: true });
        fs.mkdirSync(this.TEMP_DATA_SAVE_PATH, { recursive: true });
        fs.writeFileSync(this.FILE_SAVE_PATH, '');
        fs.writeFileSync(this.LOG_FILE_PATH, '');
    }

    /**
     * Determines if the Data File Exists
     * @returns True if the file exists, False if it does not
     */
    public SaveFileExists(): boolean {
        return fs.existsSync(this.FILE_SAVE_PATH);
    }

    /**
     * Saves the Data to the File
     */
    public SaveData(): void {
        let jsonData: string = this.GetJSONFormat();
        if (fs.existsSync(this.DATA_SAVE_PATH)) {
            fs.writeFileSync(this.FILE_SAVE_PATH, jsonData);
        }
        else
            throw new Error(`Data Save Path does not exist ${this.DATA_SAVE_PATH}`);
    }

    /**
     * Loads the Data from the File and Populates the Class Properties
     */
    public LoadDataFromFile(): void {
        let dataJSON: string = fs.readFileSync(this.FILE_SAVE_PATH, 'utf8');
        let data = JSON.parse(dataJSON);

        // Dynamically assign values from JSON to class properties
        for (const key in data) {
            if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) 
                (this as any)[key] = data[key];   
        }
    }

    /**
     * Gets the Data in JSON Format
     * @returns A string of the Data in JSON Format
     */
    protected GetJSONFormat(): string {
        return JSON.stringify(this, null, 4);
    }

    /**
     * Sets the Client ID for the Bot
     * @param clientID the ID of the Bot in string format
     */
    public SetClientID(clientID: string): void {
        if (this.CLIENT_ID !== clientID) {
            this.CLIENT_ID = clientID;
            this.SaveData();
        }
    }

    /**
     * Sets the Guild ID for the Bot
     * @param guildID ID of the Guild
     */
    public SetGuildID(guildID: string): void {
        this.GUILD_ID = guildID;

        this.SaveData();
    }

    /**
     * Sets the Log Channel that the Bot will send logs to
     * @param logChannelID The ID of the Log Channel
     */
    public SetLogChannelID(logChannelID: string) {
        this.LOG_CHANNEL_ID = logChannelID;

        this.SaveData();
    }

    /**
     * Adds a Command Log to the Log File
     * @param log Log to add to the Log File
     */
    public AddCommandLog(log: BotCommandLog): void {
        fs.appendFileSync(this.LOG_FILE_PATH, JSON.stringify(log, null, 4));
    }
}

export default BotDataManager;