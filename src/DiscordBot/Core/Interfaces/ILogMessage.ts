import BotResponse from "../Response/BotResponse";

/**
 * Interface for the Log class
 */
interface ILogMessage {

    /**
     * User who made the Log
     */
    User: string;

    /**
     * Message of the Log
     */
    LogMessage : BotResponse;

    /**
     * Date of the Log
     */
    LogDate: Date;

    /**
     * Command Name that was used to make the Log
     */
    LogCommand: string;
    
}

export default ILogMessage;