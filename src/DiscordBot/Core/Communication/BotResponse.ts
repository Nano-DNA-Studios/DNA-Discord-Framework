import { CacheType, ChatInputCommandInteraction } from "discord.js";
import BotCommunication from "./BotCommunication";

/**
 * The Message Object that is sent as a Response to the User when using a Command
 */
class BotResponse extends BotCommunication {

    /**
     * The Command Interaction that the Response is associated with
     */
    public CommandInteraction: ChatInputCommandInteraction<CacheType>;

    constructor(commandInteraction: ChatInputCommandInteraction<CacheType>, isEphemeral: boolean = true) {
        super();
        this.CommandInteraction = commandInteraction;
        this.ephemeral = isEphemeral;
    }

    /* <inheritdoc> */
    public UpdateCommunication(): void {
        let diff = (Date.now() - this.CreatedDate) / (1000 * 60);

        if (diff > BotCommunication.MAX_RESPONSE_MINS)
            return console.log("Response has Taken too long, it's been over 15 minutes");

        if (this._MessageInitialized == false) {
            this._MessageInitialized = true;
            this.CommandInteraction.reply(this).then((message) => {
                this.CommunicationInstance = message;
                this._MessageReceived = true;
            });

            return;
        }

        this.UpdateMessageLoop();
    }
}

export default BotResponse;