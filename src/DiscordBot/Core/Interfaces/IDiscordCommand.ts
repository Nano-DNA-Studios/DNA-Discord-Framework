import ICommandOption from "./ICommandOption";

/**
 * Interface for a Discord Command that will be registered to a Discord Server
 */
interface IDiscordCommand {
     /**
     *  Unique Lower Case Name Identifying the command, Sets the name to Call the Command in Discord (`/name`)
     */
     CommandName: string;

     /**
      * Describes what the Command Does or how it functions, Shows the description when hovering over the Command or in the Help Window in Discord
      */
     CommandDescription: string;

    /**
     * Array of Options associated with the Command. Options are filled in by the user when running the Command
     */
    Options?: ICommandOption[];
}

export default IDiscordCommand;