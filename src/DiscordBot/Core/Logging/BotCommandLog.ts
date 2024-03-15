import ILogMessage from '../Interfaces/ILogMessage';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';

/**
 * Class representing an instance of a Discord Bot Log
 */
class BotCommandLog implements ILogMessage {

    public User: string;

    public LogMessage: string;

    public LogCommand: string;

    public LogDate: Date;

    constructor(interaction: ChatInputCommandInteraction<CacheType>) {
        this.User = interaction.user.username;
        this.LogCommand = interaction.commandName;
        this.LogMessage = "";
        this.LogDate = new Date();
    }

    /**
     * Adds an additional message to the Log Instance
     * @param message Message to add to the Log
     */
    public AddLogMessage(message: string) {
        this.LogMessage += message + "\n";
    }

}

export default BotCommandLog;