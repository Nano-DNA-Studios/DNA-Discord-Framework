import IBotErrorLog from "../Interfaces/IBotErrorLog";

/**
 * Class representing an instance of a Discord Bot Error Log
 */
class BotErrorLog implements IBotErrorLog {

    /* inheritdoc */
    public ExceptionMessage: string;

    /* inheritdoc */
    public ExceptionDate: Date;

    /* inheritdoc */
    public ExceptionName: string;

    /* inheritdoc */
    public ExceptionStack: string;

    /**
     * Default Constructor for a Bot Error Log
     * @param message The Error Instance
     */
    constructor(message: Error) {
        this.ExceptionDate = new Date();
        this.ExceptionMessage = message.message;
        this.ExceptionName = message.name;

        if (message.stack == null)
            this.ExceptionStack = "No Stack Trace Available";
        else
            this.ExceptionStack = message.stack;
    }
}

export default BotErrorLog;