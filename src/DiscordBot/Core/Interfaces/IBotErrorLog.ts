
/**
 * The Interface for the Bot Error Log
 */
interface IBotErrorLog {

    /**
     * The Exception Message 
     */
    ExceptionMessage : string;

    /**
     * The Stack Trace of the Exception
     */
    ExceptionStack : string;

    /**
     * The Name / Type of the Exception Error
     */
    ExceptionName: string;

    /**
     * The Date the Exception was thrown
     */
    ExceptionDate: Date;

}

export default IBotErrorLog;