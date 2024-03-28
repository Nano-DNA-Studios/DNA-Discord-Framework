import ILogMessage from '../Interfaces/ILogMessage';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import BotResponse from '../Response/BotResponse';

/**
 * Class representing an instance of a Discord Bot Log
 */
class BotCommandLog implements ILogMessage {

    /* <inheritdoc */
    public User: string;

    /* <inheritdoc */
    public LogMessage: BotResponse;

    /* <inheritdoc */
    public LogCommand: string;

    /* <inheritdoc */
    public LogDate: Date;

    /* <inheritdoc */
    constructor(interaction: ChatInputCommandInteraction<CacheType>) {
        this.User = interaction.user.username;
        this.LogCommand = interaction.commandName;
        this.LogMessage = new BotResponse();
        this.LogDate = new Date();
    }

    /**
     * Adds an additional message to the Log Instance
     * @param message Message to add to the Log
     */
    public AddLogMessage(message: BotResponse) {
        this.LogMessage = message;
    }
}

export default BotCommandLog;