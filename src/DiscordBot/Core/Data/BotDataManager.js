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
const BotErrorLog_1 = __importDefault(require("../Logging/BotErrorLog"));
const BotData_1 = __importDefault(require("./BotData"));
/**
 * The Default Bot Data Manager, implementing the bareminimum for a Bot Data Manager
 */
class BotDataManager {
    /**
     * Initializes the Data Manager
     * @param botDirectory The Directory that the Bot is located in
     */
    constructor() {
        /* <inheritdoc> */
        this.DISCORD_BOT_TOKEN = "";
        /* <inheritdoc> */
        this.GUILD_ID = "";
        /* <inheritdoc> */
        this.GUILD_NAME = "";
        /* <inheritdoc> */
        this.CLIENT_ID = "";
        /* <inheritdoc> */
        this.LOG_CHANNEL_ID = "";
        /* <inheritdoc> */
        this.LAST_MESSAGE_CHANNEL_ID = "";
        this.DataManagerType = this.constructor.name;
        this.DATA_SAVE_PATH = process.cwd() + '/Resources';
        this.FILE_SAVE_PATH = this.DATA_SAVE_PATH + '/data.json';
        this.LOG_FILE_PATH = this.DATA_SAVE_PATH + '/log.txt';
        this.TEMP_DATA_SAVE_PATH = this.DATA_SAVE_PATH + `/temp`;
        this.AUTO_LOGIN_FILE = this.DATA_SAVE_PATH + `/autologin.txt`;
        this.ERROR_LOG_FILE_PATH = this.DATA_SAVE_PATH + `/errorLog.txt`;
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
        if (!fs_1.default.existsSync(this.DATA_SAVE_PATH))
            fs_1.default.mkdirSync(this.DATA_SAVE_PATH, { recursive: true });
        if (!fs_1.default.existsSync(this.TEMP_DATA_SAVE_PATH))
            fs_1.default.mkdirSync(this.TEMP_DATA_SAVE_PATH, { recursive: true });
        if (!fs_1.default.existsSync(this.FILE_SAVE_PATH))
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, '');
        if (!fs_1.default.existsSync(this.LOG_FILE_PATH))
            fs_1.default.writeFileSync(this.LOG_FILE_PATH, '');
        if (!fs_1.default.existsSync(this.ERROR_LOG_FILE_PATH))
            fs_1.default.writeFileSync(this.ERROR_LOG_FILE_PATH, '');
    }
    /**
     * Determines if the Data File Exists
     * @returns True if the file exists, False if it does not
     */
    SaveFileExists() {
        return fs_1.default.existsSync(this.FILE_SAVE_PATH);
    }
    /**
     * Determines if the Auto Login File Exists
     * @returns True if the file exists, False if it does not
     */
    AutoLoginExists() {
        return fs_1.default.existsSync(this.AUTO_LOGIN_FILE);
    }
    /**
     * Gets the Auto Login File Content
     * @returns Returns the Content of the Auto Login File
     */
    GetAutoLoginContent() {
        return fs_1.default.readFileSync(this.AUTO_LOGIN_FILE, "utf8");
    }
    /* <inheritdoc> */
    SaveData() {
        let jsonData = this.GetJSONFormat();
        if (fs_1.default.existsSync(this.DATA_SAVE_PATH)) {
            fs_1.default.writeFileSync(this.FILE_SAVE_PATH, jsonData);
        }
        else {
            let error = new Error(`Data Save Path does not exist ${this.DATA_SAVE_PATH}`);
            this.AddErrorLog(error);
            throw error;
        }
    }
    IsPlainObject(obj) {
        return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date) && !(obj instanceof Buffer);
    }
    /**
     * Loads the Data from the File and Populates the Class Properties
     */
    LoadDataFromFile() {
        let dataJSON = fs_1.default.readFileSync(this.FILE_SAVE_PATH, 'utf8');
        let data = JSON.parse(dataJSON);
        // Dynamically assign values from JSON to class properties
        for (const key in data) {
            if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                if (this.IsPlainObject(data[key])) {
                    this[key] = JSON.parse(JSON.stringify(data[key]));
                }
                else {
                    this[key] = data[key];
                }
            }
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
            BotData_1.default.InstanceByName(this.DataManagerType).SaveData();
        }
    }
    /**
     * Sets the Guild ID for the Bot
     * @param guildID ID of the Guild
     */
    SetGuildID(guildID) {
        this.GUILD_ID = guildID;
        BotData_1.default.InstanceByName(this.DataManagerType).SaveData();
    }
    /**
     * Sets the Log Channel that the Bot will send logs to
     * @param logChannelID The ID of the Log Channel
     */
    SetLogChannelID(logChannelID) {
        this.LOG_CHANNEL_ID = logChannelID;
        BotData_1.default.InstanceByName(this.DataManagerType).SaveData();
    }
    /* inheritdoc */
    AddCommandLog(log) {
        fs_1.default.appendFileSync(this.LOG_FILE_PATH, JSON.stringify(log, null, 4));
    }
    /* inheritdoc */
    AddErrorLog(log) {
        let errorLog = new BotErrorLog_1.default(log);
        if (fs_1.default.existsSync(this.ERROR_LOG_FILE_PATH))
            fs_1.default.appendFileSync(this.ERROR_LOG_FILE_PATH, JSON.stringify(errorLog, null, 4));
    }
    /**
     * Sets the Last Messaged Channel ID
     * @param messageChannelID The Message Channel ID
     */
    SetLastMessageChannelID(messageChannelID) {
        this.LAST_MESSAGE_CHANNEL_ID = messageChannelID;
        BotData_1.default.InstanceByName(this.DataManagerType).SaveData();
    }
}
exports.default = BotDataManager;
