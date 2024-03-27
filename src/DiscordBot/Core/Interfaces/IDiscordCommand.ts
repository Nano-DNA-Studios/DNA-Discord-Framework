import ICommandOption from "./ICommandOption";

/**
 * Interface for a Discord Command that will be registered to a Discord Server
 */
interface IDiscordCommand {
     /**
     * The name of the Command, must be Lowercase and Unique
     */
     CommandName: string;

     /**
      * The description of the Command
      */
     CommandDescription: string;

    /**
     * Array of Options associated with the Command. Options are filled in by the user when running the Command
     */
    Options?: ICommandOption[];
}

export default IDiscordCommand;