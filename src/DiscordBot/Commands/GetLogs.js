"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BotCommandsEnum_1 = __importDefault(require("../Core/Enums/BotCommandsEnum"));
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../Core/Commands/Command"));
/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class GetLogs extends Command_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BotCommandsEnum_1.default.GetLogs;
        this.CommandDescription = "Returns the Log File";
        this.IsEphemeralResponse = true;
        this.RunCommand = (client, interaction, dataManager) => {
            this.InitializeUserResponse(interaction, "https://tenor.com/view/leonardo-dicaprio-clapping-clap-applause-amazing-gif-16078907558888063471");
            // this.Response.attachments = [new MessageAtt"https://tenor.com/view/leonardo-dicaprio-clapping-clap-applause-amazing-gif-16078907558888063471"]
            let logChannel = interaction.client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`);
            this.AddToResponseMessage(this.LogMessage);
            if (logChannel) {
                interaction.user.send({ content: "Here are the Log Files", files: [`${dataManager.LOG_FILE_PATH}`] });
                // this.AddToResponseMessage(this.SuccessMessage);
            }
            else {
                // this.AddToResponseMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)");
                throw new Error("Log Channel ID provided does not match to a Text Channel");
            }
            this.Response.embeds = [new discord_js_1.EmbedBuilder()
                    .setTitle('Applause') // Optional: Set the title of the embed
                    .setDescription("https://tenor.com/view/leonardo-dicaprio-clapping-clap-applause-amazing-gif-16078907558888063471")
                    .setURL("https://tenor.com/view/leonardo-dicaprio-clapping-clap-applause-amazing-gif-16078907558888063471")
            ]; // Optional: Add a footer
        };
        this.RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
        this.LogMessage = "Sending Log File :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not send the Log File :warning:";
        this.SuccessMessage = ":white_check_mark: Log File sent Successfully :white_check_mark:";
    }
}
module.exports = GetLogs;
