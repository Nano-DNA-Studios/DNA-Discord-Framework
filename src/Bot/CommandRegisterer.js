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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
/**
 * Registers the commands to the Discord Server
 */
class CommandRegisterer {
    /**
     * Initializes the Command Registerer, by registering the REST API
     */
    constructor(dataManager) {
        this.Commands = [];
        this._dataManager = dataManager;
        this.rest = new discord_js_1.REST({ version: "10" }).setToken(`${this._dataManager.DISCORD_BOT_TOKEN}`);
    }
    /**
     * Maps the Commands to be Added to Discord Commands and Adds to the List of Commands to be Registered and
     * @param commands Array of Commands to be Registered
     */
    AddCommands(commands) {
        this.Commands.push(...commands);
    }
    /**
     * Registers the commands to the Discord Server
     */
    RegisterCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Registering Slash Commands');
                let body = this.Commands.map(element => ({
                    name: element.CommandName,
                    description: element.CommandDescription,
                    options: element.Options.map((option) => ({
                        type: option.type,
                        name: option.name,
                        description: option.description,
                        required: option.required || false,
                        choices: option.choices || []
                    }))
                }));
                yield this.rest.put(discord_js_1.Routes.applicationGuildCommands(this._dataManager.CLIENT_ID, this._dataManager.GUILD_ID), {
                    body: body
                });
                console.log('Slash Commands Registered');
            }
            catch (error) {
                console.log(`Error Occurred: ${error}`);
            }
        });
    }
}
exports.default = CommandRegisterer;
