"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to store Data that will be passed to a Command
 */
class CommandData {
    constructor(dataManager, client, interaction) {
        this.DataManager = dataManager;
        this.BotClient = client;
        this.CommandInteraction = interaction;
    }
}
exports.default = CommandData;
