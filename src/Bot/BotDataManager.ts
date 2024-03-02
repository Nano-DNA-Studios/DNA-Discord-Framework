import IBotDataManager from "./IBotDataManager";
import fs from 'fs';
import readline, { Interface as ReadLineInterface } from 'readline';
import BotCommandLog from "./BotCommandLog";

/**
 * The Default Bot Data Manager, implementing the bareminimum for a Bot Data Manager
 */
class BotDataManager implements IBotDataManager {

    public LOG_FILE_PATH: string;

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
        this.DATA_SAVE_PATH = process.cwd() + '\\Resources';
        this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '\\data.json';
        this.LOG_FILE_PATH = this.DATA_SAVE_PATH + '\\log.txt';
    }

    /**
     * Loads the Data from the File or Registers it by creating the Default Data and file
     */
    public async LoadData() {

        if (this.SaveFileExists()) {
            await this.LoadDataFromFile();
        } 
        /*
        else {
            fs.mkdirSync(this.DATA_SAVE_PATH, { recursive: true });
            await this.RegisterServerController();
            fs.writeFileSync(this.LOG_FILE_PATH, '');
            this.LoadDataFromFile();
        }
        */
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
     * Registers the Bot Token by asking for the Bot Token, Used when the first Instance of the Bot is created
     */
    public async RegisterBotToken (): Promise<void> {
        const setupReader: ReadLineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //Setup Question format
        const prompt = (query: string) => new Promise<string>((resolve) => setupReader.question(query, resolve));

         // Prompt for bot token and guild ID asynchronously
         this.DISCORD_BOT_TOKEN = await prompt('Enter the Discord Bot Token: ');

          // Close the readline interface after collecting all necessary inputs
        setupReader.close();

        //Save the data to the file
        let JSONData: string = JSON.stringify(this, null, 4);
        fs.writeFileSync(this.FILE_SAVE_PATH, JSONData);
    }

    /**
     * Registers the Guild Name by asking for the Guild Name, Determines which Server to Connect to
     * @param options Array of Guild Names to choose from
     */
    public async RegisterGuildName (options: string[]): Promise<void> {
        const setupReader: ReadLineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        if (options.length > 1)
        {
            console.log('\nSelect the Guild Name from the following options:');
            console.log("\n" + options.join('\n') + "\n");
    
            //Setup Question format
            const prompt = (query: string) => new Promise<string>((resolve) => setupReader.question(query, resolve));
    
            // Prompt for bot token and guild ID asynchronously
            this.GUILD_NAME = await prompt('Enter the Guild Name: ');
    
        } else
            this.GUILD_NAME = options[0];

        // Close the readline interface after collecting all necessary inputs
        setupReader.close();

        //Save the data to the file
        let JSONData: string = JSON.stringify(this, null, 4);
        fs.writeFileSync(this.FILE_SAVE_PATH, JSONData);
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