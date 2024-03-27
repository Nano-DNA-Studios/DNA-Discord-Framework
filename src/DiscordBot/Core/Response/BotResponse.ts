import { APIAttachment, Attachment, AttachmentBuilder, AttachmentPayload, BufferResolvable, JSONEncodable, MessageCreateOptions, MessageEditOptions } from "discord.js";
import { Stream } from "stream";


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

}

export default BotResponse;