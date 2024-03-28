import { APIAttachment, APIEmbed, Attachment, AttachmentBuilder, AttachmentPayload, BufferResolvable, JSONEncodable, MessageCreateOptions, MessageEditAttachmentData, MessageEditOptions } from "discord.js";
import { Stream } from "stream";

/**
 * The Message Object that is sent as a Response to the User when using a Command
 */
class BotResponse implements MessageCreateOptions, MessageEditOptions
{
    /**
     * The Message Content of the Response 
     */
content?: string = "";

/**
 * The Files associated with the Response
 */
files?: (BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentBuilder | AttachmentPayload)[] = [];

public embeds?: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined;

attachments?: (Attachment | MessageEditAttachmentData)[] | undefined;



}

export default BotResponse;