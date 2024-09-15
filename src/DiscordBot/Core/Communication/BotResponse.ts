import {  CacheType, ChatInputCommandInteraction} from "discord.js";

import BotCommunication from "./BotCommunication";

/**
 * The Message Object that is sent as a Response to the User when using a Command
 */
class BotResponse extends BotCommunication {

    /**
     * The Command Interaction that the Response is associated with
     */
    public CommandInteraction: ChatInputCommandInteraction<CacheType>;

    constructor (commandInteraction: ChatInputCommandInteraction<CacheType>, isEphemeral: boolean = true) 
    {
        super();
        this.CommandInteraction = commandInteraction;
        this.ephemeral = isEphemeral;
    }

    /* <inheritdoc> */
    public async UpdateCommunication(): Promise<void> {

        console.log(`UTC date : ${this.CreatedDate.getTime()}`);
        console.log(`Date now : ${Date.now()}`);
        

        let diff = (Date.now() - this.CreatedDate.getTime()) / 1000;
        console.log(`Diff : ${diff}`);

        if (diff > BotCommunication.MAX_RESPONSE_MINS)
            return console.log("Response has Taken too long, it's been over 15 minutes");

        if (this.CommunicationInstance === undefined)
            this.CommunicationInstance = await this.CommandInteraction.reply(this);
        else
            this.CommunicationInstance?.edit(this);
    }
}

export default BotResponse;