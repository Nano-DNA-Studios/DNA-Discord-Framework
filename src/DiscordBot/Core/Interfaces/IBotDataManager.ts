
/**
 * Interface for the Bot Data Manager
 */
interface IBotDataManager {

    /**
     * Save Path for the Bots Data
     */
    DATA_SAVE_PATH: string;

    /**
     * Save Path for the File Data
     */
    FILE_SAVE_PATH: string;

    /**
     * The Path to the Temporary data Folder
     */
    TEMP_DATA_SAVE_PATH:string;

    /**
     * The File Path and File that contains the Discord Bot Token to make it easier to login if you are using Docker or running locally
     */
    AUTO_LOGIN_FILE:string;

    /**
     * Discord Bot Token
     */
    DISCORD_BOT_TOKEN: string;

    /**
     * Discord Server ID
     */
    GUILD_ID: string;

    /**
     * Name of the Discord Server
     */
    GUILD_NAME: string;

    /**
     * Id of the Discord Bot
     */
    CLIENT_ID: string;

    /**
     * Channel ID of the Log Channel that the Bot will send logs to
     */
    LOG_CHANNEL_ID: string;

    /**
     * Directory to the Log File
     */
    LOG_FILE_PATH: string;

}

export default IBotDataManager;