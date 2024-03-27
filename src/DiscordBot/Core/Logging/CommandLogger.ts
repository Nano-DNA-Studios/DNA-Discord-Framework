import { CacheType, ChatInputCommandInteraction, InteractionResponse, TextChannel, Client, Message } from 'discord.js';
import BotDataManager from '../Data/BotDataManager';
import BotCommandLog from './BotCommandLog';
import BotData from '../Data/BotData';
import BotResponse from '../Response/BotResponse';

/**
 * Logs the Command Responses and Stores the Log
 */
class CommandLogger {

    /**
    * Stores the instance of the Response to the Command, is Often ephemeral
    */
    public Response: InteractionResponse | undefined;

    /**
     * The Message to the Log Channel
     */
    public LogMessage: Message | undefined;

    /**
    * Initializes all info needed for the Response to the Command
    * @param interaction Command Interaction
    * @param client Discord Bot Client
    * @param BotDataManager Data Manager
    */
    public async InitializeResponse(interaction: ChatInputCommandInteraction<CacheType>, client: Client, isEphemeral: boolean, response: BotResponse) {
        const dataManager = BotData.Instance(BotDataManager)
       // let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
        let LogChannel = client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`) as TextChannel;

        this.Response = await interaction.reply({ content: response.content, ephemeral: isEphemeral }) as InteractionResponse;
        this.LogMessage = await LogChannel.send({content: response.content});
    }

    public async LogInChannel(logMessage: BotResponse) {
        this.LogMessage?.edit(logMessage);
    }

    public RespondToUser(response: BotResponse) {
        this.Response?.edit(response);
    }

    /**
     * Logs the Command and Responds to the User 
     * @param message Message to Log and Respond
     */
    public LogAndRespond(logMessage: BotResponse, response: BotResponse) {
        this.LogInChannel(logMessage);
        this.RespondToUser(response);
    }

    public GetCommandLog(interaction: ChatInputCommandInteraction<CacheType>): BotCommandLog {

        let log = new BotCommandLog(interaction);

       // log.AddLogMessage(this.ResponseMessage);

        return log;
    }

}

export default CommandLogger;