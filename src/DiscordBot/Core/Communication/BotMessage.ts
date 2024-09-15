import { TextChannel } from "discord.js";
import BotCommunication from "./BotCommunication";

class BotMessage extends BotCommunication {
    /**
    * The Command Interaction that the Response is associated with
    */
    public MessageChannel: TextChannel;

    /**
     * Boolean Flag to determine if a new Message is wanted instead of editing
     */
    private _newMessageWanted : boolean = false;

    constructor(channel: TextChannel) {
        super();
        this.MessageChannel = channel;
    }

    /**
     * Flags the Message to be a new Message instead of an Edit (Wipes files and content)
     */
    public NewMessage ():void{
        this._newMessageWanted = true;
        this.content = "";
        this.files = [];
    }

    /* <inheritdoc> */
    public async UpdateCommunication(): Promise<void> {

        if (this.CommunicationInstance === undefined || this._newMessageWanted)
        {
            this.CommunicationInstance = await this.MessageChannel.send(this);
            this._newMessageWanted = false;
        }
        else
            this.CommunicationInstance?.edit(this);
    }
}

export default BotMessage;