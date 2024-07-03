import * as fs from "fs";
import * as path from "path";
import ICommand from "./DiscordBot/Core/Interfaces/ICommand";
import Command from "./DiscordBot/Core/Commands/Command";
import BotData from "./DiscordBot/Core/Data/BotData";
import BotDataManager from "./DiscordBot/Core/Data/BotDataManager";

/**
 * Utility Class for Searching Files
 */
class FileSearch {

  /**
   * Path the the Directory of the Bot
   */
  private _directoryPath: string = fs.realpathSync(process.cwd() + "/src");

  /**
   * Path this Module is Located
   */
  private _modulePath: string = fs.realpathSync(__dirname);

  /**
  * Gets all the files with JavaScript endings in the Bot Directory
  * @returns An Array of Java Script File Paths within the Bot Directory
  */
  public GetAllJSFiles(): string[] {
    let AllFiles: string[] = [];

    AllFiles.push(...this.GetFiles(this._directoryPath, ".js"));

    if (this._directoryPath != this._modulePath)
      AllFiles.push(...this.GetFiles(this._modulePath, ".js"));

    return AllFiles
  }

  /**
  * Gets all the Java Script Files within the provided directory and subdirectories through recursion
  * @param Path The start Path to search for files
  * @returns Array of all Java Script Files within the provided directory and subdirectories
  */
  public GetFiles(Path: string, fileExtension: string): string[] {
    let AllFiles: string[] = [];

    if (fs.existsSync(Path)) {
      let files = fs.readdirSync(Path);

      files.forEach(file => {
        let absPath = Path + "/" + file;

        if (fs.lstatSync(absPath).isDirectory())
          AllFiles.push(...this.GetFiles(absPath, fileExtension));
        else if (path.extname(absPath) === fileExtension)
          AllFiles.push(absPath);
      });
    }

    return AllFiles;
  }

  /**
   * Gets all the Command Instances from the Provided Directory
   * @returns Array of IT Command Objects
   */
  public GetAllCommandInstances(dataManager: BotDataManager): ICommand[] {
    let Commands: ICommand[] = [];

    const CommandClasses = this.GetAllCommands();

    CommandClasses.forEach(commandClass => {
      const commandInstance = new commandClass(dataManager);
      if (commandInstance.CommandName !== '')
        Commands.push(commandInstance);

    });

    return Commands;
  }

  /**
  * Gets all the Command Classes from the Provided Directory
  * @returns Array of IT Command Objects
  */
  public GetAllCommands<T extends { new(dataManager: BotDataManager): Command } & Command>(): T[] {
    let Commands: T[] = [];

    const Files = this.GetAllJSFiles();

    Files.forEach(file => {
      const module = require(file)

      try {
        const classType = module;
        try {
          const moduleInstance = new classType() as T;

          if ('CommandName' in moduleInstance)
            Commands.push(module);

        } catch (error) { }
      } catch
      (error) {
        console.log("Error Occurred: " + error);
        if (error instanceof Error)
          BotData.Instance(BotDataManager).AddErrorLog(error);
      }
    });

    return Commands;
  }
}

export default FileSearch;
