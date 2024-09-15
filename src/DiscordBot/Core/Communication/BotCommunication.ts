import { APIAttachment, Attachment, AttachmentBuilder, AttachmentPayload, BufferResolvable, InteractionResponse, InteractionResponseType, JSONEncodable, Message, MessageCreateOptions, MessageEditOptions } from "discord.js";
import { Stream } from "stream";
import fs from "fs";


abstract class BotCommunication implements MessageCreateOptions, MessageEditOptions {

    /**
     * The Maximum Number of Minutes that the Response is valid for
     */
    public static MAX_RESPONSE_MINS: number = 15;

    /**
     * The Date the Response was created
     */
    public CreatedDate: Date = new Date();

    /**
     * The Message Content of the Response 
     */
    public content?: string = "";

    /**
     * Boolean Flag to determine if the Message is Ephemeral
     */
    public ephemeral?: boolean = false;

    /**
     * The Files associated with the Response
     */
    public files?: (BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentBuilder | AttachmentPayload)[] = [];

    /**
     * Boolean Flag to determine if the Message has been received/initialized and can be updated
     */
    protected _MessageInitialized: boolean = false;

    protected _MessageReceived: boolean = false;

    /**
     * The Communication object that is sent to the User
     */
    public CommunicationInstance: InteractionResponse | Message<true> | undefined;

    //Add a get link function

    /**
     * Gets the Link of the Communication Instance
     * @returns The Link of the Communication Instance
     */
    public GetLink(): string {
        if (this.CommunicationInstance === undefined)
            return "No Link Available";

        if (this.CommunicationInstance instanceof InteractionResponse)
            return `https://discord.com/channels/${this.CommunicationInstance.interaction.guildId}/${this.CommunicationInstance.interaction.channelId}/${this.CommunicationInstance.id}`;

        if (this.CommunicationInstance instanceof Message)
            return `https://discord.com/channels/${this.CommunicationInstance.guildId}/${this.CommunicationInstance.channelId}/${this.CommunicationInstance.id}`;

        return "No Link Available";
    }

    /**
     * Adds Content to the Message as a new Line
     * @param content The String Content to add to the Message
     */
    public AddMessage(content: string, delayUpdate: boolean = false): void {
        this.content += content + "\n";

        if (!delayUpdate)
            this.UpdateCommunication();
    }

    /**
     * Adds a File to the Message
     * @param filePath The File Path to the File to add to the Message
     */
    public AddFile(filePath: string, delayUpdate: boolean = false): void {
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist");
            return;
        }

        if (!this.files?.some(file => file === filePath))
            this.files?.push(filePath);

        if (!delayUpdate)
            this.UpdateCommunication();
    }

    /**
     * Adds a Message as a Text File to the Messages
     * @param content The Content of the Text File
     * @param fileName The File Name of the Text File to be uploaded
     */
    public AddTextFile(content: string, fileName: string, delayUpdate: boolean = false): void {
        const buffer = Buffer.from(content, 'utf-8');
        const file = new AttachmentBuilder(buffer, { name: `${fileName}.txt` });

        this.files?.push(file);

        if (!delayUpdate)
            this.UpdateCommunication();
    }

    /**
     * Updates the Communication Instance with the new Message Content and Files
     */
    public abstract UpdateCommunication(): void;

    /**
     * Waiting Loop for the Message to be Received
     * @param count The Number of Times the Loop has Run through iterations
     */
    protected UpdateMessageLoop (count: number = 0): void {
        if (count > 50)
            return console.log("Message has Taken too long, it's been over 15 minutes");

        if (this._MessageReceived)
            this.CommunicationInstance?.edit(this);
        else
            setTimeout(() => { this.UpdateMessageLoop(count + 1); }, 100);
    }
}

export default BotCommunication;