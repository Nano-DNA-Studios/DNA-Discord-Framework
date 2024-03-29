"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 * The Default Bot Data Manager, implementing the bareminimum for a Bot Data Manager
 */
class BotDataManager {
    /**
     * Initializes the Data Manager
     * @param botDirectory The Directory that the Bot is located in
     */
    constructor() {
        this.DISCORD_BOT_TOKEN = "";
        this.GUILD_ID = "";
        this.GUILD_NAME = "";
        this.CLIENT_ID = "";
        this.LOG_CHANNEL_ID = "";
        this.DATA_SAVE_PATH = process.cwd() + '/Resources';
        this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '/data.json';
        this.LOG_FILE_PATH = this.DATA_SAVE_PATH + '/log.txt';
    }
    /**
     * Loads the Data from the File or Registers it by creating the Default Data and file
     */
    LoadData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.SaveFileExists()) {
                yield this.LoadDataFromFile();
            }
        });
    }
    /**
     * Initializes the Data by creating the Save Path and the File
     */
    InitializeData() {
        fs_1.default.mkdirSync(this.DATA_SAVE_PATH, { recursive: true });
        fs_1.default.writeFileSync(this.FILE_SAVE_PATH, '');
        fs_1.default.writeFileSync(this.LOG_FILE_PATH, '');
    }
    /**
     * Determines if the Data File Exists
     * @returns True if the file exists, False if it does not
     */
    SaveFileExists() {
        return fs_1.default.existsSync(this.FILE_SAVE_PATH);
    }
    /**
     * Saves the Data to the File
     */
    SaveData() {
        let jsonData = this.GetJSONFormat();
        if (fs_1.default.existsSync(this.DATA_SAVE_PATH)) {
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, jsonData);
        }
        else
            throw new Error(`Data Save Path does not exist ${this.DATA_SAVE_PATH}`);
    }
    /**
     * Loads the Data from the File and Populates the Class Properties
     */
    LoadDataFromFile() {
        let dataJSON = fs_1.default.readFileSync(this.FILE_SAVE_PATH, 'utf8');
        let data = JSON.parse(dataJSON);
        // Dynamically assign values from JSON to class properties
        for (const key in data) {
            if (data.hasOwnProperty(key) && this.hasOwnProperty(key))
                this[key] = data[key];
        }
    }
    /**
     * Gets the Data in JSON Format
     * @returns A string of the Data in JSON Format
     */
    GetJSONFormat() {
        return JSON.stringify(this, null, 4);
    }
    /**
     * Sets the Client ID for the Bot
     * @param clientID the ID of the Bot in string format
     */
    SetClientID(clientID) {
        if (this.CLIENT_ID !== clientID) {
            this.CLIENT_ID = clientID;
            this.SaveData();
        }
    }
    /**
     * Sets the Guild ID for the Bot
     * @param guildID ID of the Guild
     */
    SetGuildID(guildID) {
        this.GUILD_ID = guildID;
        this.SaveData();
    }
    /**
     * Sets the Log Channel that the Bot will send logs to
     * @param logChannelID The ID of the Log Channel
     */
    SetLogChannelID(logChannelID) {
        this.LOG_CHANNEL_ID = logChannelID;
        this.SaveData();
    }
    /**
     * Adds a Command Log to the Log File
     * @param log Log to add to the Log File
     */
    AddCommandLog(log) {
        fs_1.default.appendFileSync(this.LOG_FILE_PATH, JSON.stringify(log, null, 4));
    }
}
exports.default = BotDataManager;
