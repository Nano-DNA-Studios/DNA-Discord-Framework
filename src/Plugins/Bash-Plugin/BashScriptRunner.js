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
const ssh2_1 = require("ssh2");
const child_process_1 = require("child_process");
const BotDataManager_1 = __importDefault(require("../../DiscordBot/Core/Data/BotDataManager"));
const BotData_1 = __importDefault(require("../../DiscordBot/Core/Data/BotData"));
/**
 * Runs Bash Scripts provided from a Bash Command
 */
class BashScriptRunner {
    /**
     * Initializes the Bash Script runner and can optionally provide SSHConnection info if SSH execution is intended
     * @param connectionInfo The Connection info if the SSH execution is intended
     */
    constructor(connectionInfo = undefined) {
        this.ConnectionInfo = connectionInfo;
        this.ErrorLogs = "";
        this.StandardErrorLogs = "";
        this.StandardOutputLogs = "";
    }
    /**
     * Runs a Bash Script through a local execution
     * @param Script Bash Script to Run
     * @returns A Promise void
     */
    RunLocally(Script, rethrow = false, WorkingDirectory = "") {
        return new Promise((resolve, reject) => {
            const process = (0, child_process_1.spawn)(Script, { shell: true, cwd: WorkingDirectory });
            process.stdout.on('data', (data) => {
                this.StandardOutputLogs += `${data} \n`;
            });
            process.stderr.on('data', (data) => {
                this.StandardErrorLogs += data + "\n";
                console.error(`stderr: ${data}`);
            });
            process.on('close', (code) => {
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(new Error(`Process exited with code ${code} while running : ${Script}`)); // Reject the promise on error
                }
            });
            process.on('error', (error) => {
                reject(error);
            });
        }).catch((error) => {
            if (error instanceof Error) {
                BotData_1.default.Instance(BotDataManager_1.default).AddErrorLog(error);
            }
            console.error("Error while running the script", error);
            if (rethrow)
                throw error;
        });
    }
    /**
     * Runs a Bash Script through an SSH Connection
     * @param Script Bash Script to Run
     * @returns A Promise Void
     */
    RunThroughSHH(Script) {
        return __awaiter(this, void 0, void 0, function* () {
            const ServerConnection = yield this.ConnectToServer();
            return new Promise((resolve, reject) => {
                ServerConnection.exec(`${Script}`, (err, stream) => {
                    if (err) {
                        if (err != null)
                            BotData_1.default.Instance(BotDataManager_1.default).AddErrorLog(err);
                        else
                            throw err;
                    }
                    stream
                        .on("close", (code, signal) => {
                        resolve();
                    })
                        .on("data", (data) => {
                        this.StandardOutputLogs += data + "\n";
                    })
                        .stderr.on("data", (data) => {
                        this.StandardErrorLogs += data + "\n";
                    });
                });
            });
        });
    }
    /**
     * Connects to a Server through SSH
     * @returns A Promise to the SSH Client
     */
    ConnectToServer() {
        return new Promise((resolve, reject) => {
            var _a, _b, _c, _d;
            if (this.ConnectionInfo) {
                const conn = new ssh2_1.Client();
                try {
                    conn.on('ready', () => {
                        console.log('SSH Connection ready');
                        resolve(conn); // Resolve with the connection instance
                    }).on('error', (err) => {
                        console.error('SSH Connection error:', err);
                        reject(err);
                    }).connect({
                        host: (_a = this.ConnectionInfo) === null || _a === void 0 ? void 0 : _a.Host,
                        port: (_b = this.ConnectionInfo) === null || _b === void 0 ? void 0 : _b.Port,
                        username: (_c = this.ConnectionInfo) === null || _c === void 0 ? void 0 : _c.Username,
                        password: (_d = this.ConnectionInfo) === null || _d === void 0 ? void 0 : _d.Password
                    });
                }
                catch (error) {
                    if (error instanceof Error)
                        BotData_1.default.Instance(BotDataManager_1.default).AddErrorLog(error);
                    console.log("Connection settings are not right. Check you connection settings again");
                }
            }
            else
                reject("Connection Info has not been provided");
        });
    }
}
exports.default = BashScriptRunner;
