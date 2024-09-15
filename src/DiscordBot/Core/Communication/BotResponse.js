"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotCommunication_1 = __importDefault(require("./BotCommunication"));
/**
 * The Message Object that is sent as a Response to the User when using a Command
 */
class BotResponse extends BotCommunication_1.default {
    constructor(commandInteraction, isEphemeral = true) {
        super();
        this.CommandInteraction = commandInteraction;
        this.ephemeral = isEphemeral;
    }
    /* <inheritdoc> */
    UpdateCommunication() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(`UTC date : ${this.CreatedDate.getTime()}`);
            console.log(`Date now : ${Date.now()}`);
            let diff = (Date.now() - this.CreatedDate.getTime()) / 1000;
            console.log(`Diff : ${diff}`);
            if (diff > BotCommunication_1.default.MAX_RESPONSE_MINS)
                return console.log("Response has Taken too long, it's been over 15 minutes");
            if (this.CommunicationInstance === undefined)
                this.CommunicationInstance = yield this.CommandInteraction.reply(this);
            else
                (_a = this.CommunicationInstance) === null || _a === void 0 ? void 0 : _a.edit(this);
        });
    }
}
exports.default = BotResponse;
