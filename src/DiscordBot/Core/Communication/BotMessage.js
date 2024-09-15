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
class BotMessage extends BotCommunication_1.default {
    constructor(channel) {
        super();
        /**
         * Boolean Flag to determine if a new Message is wanted instead of editing
         */
        this._newMessageWanted = false;
        this.MessageChannel = channel;
    }
    /**
     * Flags the Message to be a new Message instead of an Edit (Wipes files and content)
     */
    NewMessage() {
        this._newMessageWanted = true;
        this.content = "";
        this.files = [];
    }
    /* <inheritdoc> */
    UpdateCommunication() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.CommunicationInstance === undefined || this._newMessageWanted) {
                this.CommunicationInstance = yield this.MessageChannel.send(this);
                this._newMessageWanted = false;
            }
            else
                (_a = this.CommunicationInstance) === null || _a === void 0 ? void 0 : _a.edit(this);
        });
    }
}
exports.default = BotMessage;
