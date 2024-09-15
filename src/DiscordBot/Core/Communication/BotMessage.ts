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
    private _newMessageWanted: boolean = false;

    constructor(channel: TextChannel) {
        super();
        this.MessageChannel = channel;
    }

    /**
     * Flags the Message to be a new Message instead of an Edit (Wipes files and content)
     */
    public NewMessage(): void {
        this._newMessageWanted = true;
        this.content = "";
        this.files = [];
    }

    

    /* <inheritdoc> */
    public UpdateCommunication(): void {

        if (this._newMessageWanted || this._MessageInitialized == false) {
            this._newMessageWanted = false;
            this._MessageInitialized = true;
            this.MessageChannel.send(this).then((message) => {
                this.CommunicationInstance = message;
                this._MessageReceived = true;
            });
            return;
        }

        //const UpdateMessage = (count: number = 0) => {
//
        //    if (count > 50)
        //        return console.log("Message has Taken too long, it's been over 15 minutes");
//
        //    if (this._MessageReceived)
        //        this.CommunicationInstance?.edit(this);
        //    else
        //        setTimeout(() => { UpdateMessage(count + 1); }, 100);
        //}
//
        //UpdateMessage();

        this.UpdateMessageLoop();
    }
}

export default BotMessage;