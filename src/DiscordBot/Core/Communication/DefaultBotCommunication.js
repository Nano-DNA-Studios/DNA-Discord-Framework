"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotCommunication_1 = __importDefault(require("./BotCommunication"));
class DefaultBotCommunication extends BotCommunication_1.default {
    UpdateCommunication() {
        return new Promise((resolve, reject) => { resolve(); });
    }
    constructor() {
        super();
        this.content = "Empty Message";
    }
}
exports.default = DefaultBotCommunication;
