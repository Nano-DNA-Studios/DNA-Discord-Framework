import { Client } from "ssh2";
import { spawn } from 'child_process';
import SSHConnectionInfo from "./SSHConnectionInfo";
import BotDataManager from "../../DiscordBot/Core/Data/BotDataManager";
import BotData from "../../DiscordBot/Core/Data/BotData";

/**
 * Runs Bash Scripts provided from a Bash Command
 */
class BashScriptRunner {

    /**
     * The Connection info to run a Command through an SSH Connection
     */
    public ConnectionInfo: SSHConnectionInfo | undefined;

    /**
     * The Error Logs collected through the commands execution
     */
    public ErrorLogs: string;

    /**
     * The Standard Error Logs collected through the commands execution
     */
    public StandardErrorLogs: string;

    /**
     * The Standard Output Logs collected through the commands execution
     */
    public StandardOutputLogs: string;

    /**
     * Initializes the Bash Script runner and can optionally provide SSHConnection info if SSH execution is intended
     * @param connectionInfo The Connection info if the SSH execution is intended
     */
    constructor(connectionInfo: SSHConnectionInfo | undefined = undefined) {
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
    public RunLocally(Script: string, WorkingDirectory: string = ""): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const process = spawn(Script, { shell: true, cwd: WorkingDirectory });

            process.stdout.on('data', (data: string) => {
                this.StandardOutputLogs += `${data} \n`;
            });

            process.stderr.on('data', (data) => {
                this.StandardErrorLogs += data + "\n";
                console.error(`stderr: ${data}`);
            });

            process.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Process exited with code ${code}`)); // Reject the promise on error
                }
            });

            process.on('error', (error) => {
                reject(error);
            });
        }).catch((error) => {
            if (error instanceof Error) {
                BotData.Instance(BotDataManager).AddErrorLog(error);
            }
            console.error("Error while running the script", error);
        });
    }

    /**
     * Runs a Bash Script through an SSH Connection
     * @param Script Bash Script to Run
     * @returns A Promise Void
     */
    public async RunThroughSHH(Script: string,): Promise<void> {

        const ServerConnection = await this.ConnectToServer();

        return new Promise<void>((resolve, reject) => {
            ServerConnection.exec(`${Script}`, (err, stream) => {
                if (err) {
                    if (err != null)
                        BotData.Instance(BotDataManager).AddErrorLog(err);
                    else
                        throw err;
                }

                stream
                    .on("close", (code: string, signal: string) => {
                        resolve();
                    })
                    .on("data", (data: string) => {

                        this.StandardOutputLogs += data + "\n";
                    })
                    .stderr.on("data", (data) => {
                        this.StandardErrorLogs += data + "\n";
                    });
            });
        });
    }

    /**
     * Connects to a Server through SSH
     * @returns A Promise to the SSH Client
     */
    ConnectToServer(): Promise<Client> {
        return new Promise((resolve, reject) => {
            if (this.ConnectionInfo) {
                const conn = new Client();
                try {
                    conn.on('ready', () => {
                        console.log('SSH Connection ready');
                        resolve(conn); // Resolve with the connection instance
                    }).on('error', (err) => {
                        console.error('SSH Connection error:', err);
                        reject(err);
                    }).connect({

                        host: this.ConnectionInfo?.Host!,
                        port: this.ConnectionInfo?.Port!,
                        username: this.ConnectionInfo?.Username!,
                        password: this.ConnectionInfo?.Password!
                    });
                } catch (error) {
                    if (error instanceof Error) 
                        BotData.Instance(BotDataManager).AddErrorLog(error);
                    console.log("Connection settings are not right. Check you connection settings again");
                }
            } else
                reject("Connection Info has not been provided");
        });
    }
}

export default BashScriptRunner;
