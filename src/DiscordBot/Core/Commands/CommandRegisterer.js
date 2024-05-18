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
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const BotDataManager_1 = __importDefault(require("../Data/BotDataManager"));
const BotData_1 = __importDefault(require("../Data/BotData"));
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
        this.rest = new rest_1.REST({ version: "10" }).setToken(`${this._dataManager.DISCORD_BOT_TOKEN}`);
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
                console.log('Registering Commands');
                let body = this.Commands.map(element => {
                    var _a;
                    return ({
                        name: element.CommandName,
                        description: element.CommandDescription,
                        options: (_a = element.Options) === null || _a === void 0 ? void 0 : _a.map((option) => ({
                            type: option.type,
                            name: option.name,
                            description: option.description,
                            required: option.required || false,
                            choices: option.choices || []
                        }))
                    });
                });
                console.log(`Registering Following Commands: [${body.map(command => command.name).join(', ')}]`);
                yield this.rest.put(v9_1.Routes.applicationGuildCommands(this._dataManager.CLIENT_ID, this._dataManager.GUILD_ID), {
                    body: body
                });
                console.log('Commands Registered');
            }
            catch (error) {
                if (error instanceof Error)
                    BotData_1.default.Instance(BotDataManager_1.default).AddErrorLog(error);
                console.log(`Error Occurred: ${error}`);
            }
        });
    }
}
exports.default = CommandRegisterer;
