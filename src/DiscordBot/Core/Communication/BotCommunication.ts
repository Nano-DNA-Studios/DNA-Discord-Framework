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

    /**
     * The Communication object that is sent to the User
     */
    public CommunicationInstance: InteractionResponse | Message<true> | undefined;

    //Add a get link function

    /**
     * Adds Content to the Message as a new Line
     * @param content The String Content to add to the Message
     */
    public AddMessage(content: string, delayUpdate: boolean = false): void {

        this.content += content + "\n";

        if (!delayUpdate)
            this.Update();
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
            this.Update();
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
            this.Update();
    }

    /**
     * Updates the Communication Instance with the new Message Content and Files
     */
    public abstract UpdateCommunication(): Promise<void>;

    /**
     * Updates the Communication Instance with the new Message Content and Files
     */
    private Update(): void {
        let updated = false;

        this.UpdateCommunication().then(() => {
            updated = true;
        })

        const UpdateLoop = (count: number = 0) => {
            if (updated)
                return;

            if (count > 1000)
                return console.log("Failed to Update Communication Instance");

            setTimeout(() => {
                UpdateLoop(count + 1);
            }, 100);
        }

        UpdateLoop();
    }

}

export default BotCommunication;