"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("../Defaults/DefaultCommandHandler"));
const BotResponse_1 = __importDefault(require("../Response/BotResponse"));
//Split this into a Configure and Execute part?
/**
 * Represents a Command for a Discord Bot
 */
class Command {
    constructor() {
        /* <inheritdoc> */
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
        /* <inheritdoc> */
        this.Response = new BotResponse_1.default();
        /**
         * Boolean Flag to indicate when the Response Instance sent to the User has been received and the Promise has been accomplished
         */
        this._responseReceived = false;
    }
    /* <inheritdoc> */
    InitializeUserResponse(interaction, message) {
        this.Response.content = message + "\n";
        const reply = interaction.reply({ content: this.Response.content, ephemeral: this.IsEphemeralResponse });
        reply.then((interactionResponse) => {
            this.UserResponse = interactionResponse;
            this._responseReceived = true;
        });
    }
    /* <inheritdoc> */
    AddToResponseMessage(content) {
        this.Response.content += content + "\n";
        this.UpdateResponse();
    }
    /* <inheritdoc> */
    AddFileToResponseMessage(filePath) {
        var _a, _b;
        if (!((_a = this.Response.files) === null || _a === void 0 ? void 0 : _a.some(file => file === filePath))) {
            (_b = this.Response.files) === null || _b === void 0 ? void 0 : _b.push(filePath);
        }
        this.UpdateResponse();
    }
    /**
     * Updates the Bot Response sent to the User created from {@link InitializeUserResponse}
     */
    UpdateResponse() {
        const attemptToAdd = () => {
            var _a;
            if (this._responseReceived)
                (_a = this.UserResponse) === null || _a === void 0 ? void 0 : _a.edit(this.Response);
            else
                setTimeout(attemptToAdd, 100);
        };
        attemptToAdd();
    }
}
exports.default = Command;
