#!/usr/bin/env node
import * as fs from 'fs-extra';
import * as path from 'path';

const commandName = process.argv[2];

const currentDir = process.cwd();
const srcDir = path.join(currentDir, "src");
const CommandDir = findCommandsDir(srcDir, "Commands");

if (!CommandDir) {
    console.error("Could not find Commands directory in src");
    process.exit(1);
}

fs.writeFileSync(path.join(CommandDir, `${commandName}.ts`), NewCommandText(commandName));

console.log(`Command ${commandName} created successfully!`);

function findCommandsDir(currentDir: string, targetDirName: string): string | null {
    const filesAndDirs = fs.readdirSync(currentDir);

    for (const fileOrDir of filesAndDirs) {
        const fullPath = path.join(currentDir, fileOrDir);
        const stat = fs.statSync(fullPath);

        // Check if it's the directory we're looking for
        if (stat.isDirectory()) {
            if (fileOrDir === targetDirName) {
                return fullPath;
            } else {
                // Recursively search in this directory
                const found = findCommandsDir(fullPath, targetDirName);
                if (found) return found;
            }
        }
    }
    return null;
}

function NewCommandText (commandName: string) : string {
    return `import { Client, ChatInputCommandInteraction, CacheType } from "discord.js";
import { BotDataManager, Command } from "dna-discord-framework";

class ${commandName} extends Command {

    /* <inheritdoc> */
    public CommandName: string = '${commandName.toLowerCase()}';

    /* <inheritdoc> */
    public CommandDescription: string = 'A Description for ${commandName} goes here.';

    /* <inheritdoc> */
    public RunCommand = async (client: Client<boolean>, interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => {
    };

    /* <inheritdoc> */
    public IsEphemeralResponse: boolean = true;
}

export = ${commandName};`;
}