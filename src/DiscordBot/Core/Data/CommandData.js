"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandData {
    constructor(dataManager, client, interaction) {
        this.DataManager = dataManager;
        this.BotClient = client;
        this.CommandInteraction = interaction;
    }
}
exports.default = CommandData;
