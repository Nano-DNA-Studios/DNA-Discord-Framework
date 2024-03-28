import Command from "../DiscordBot/Core/Commands/Command";

/**
 * Abstract Class for Bash Commands
 */
abstract class BashCommand extends Command {
   
    /**
     * Function that is dedicated to running the Bash Commands associated with this instanc of {@link BashCommand}
     */
   public abstract RunBashCommand(): void;


   //Variable for the Script that is made?
   //Is run locally variable
   //





   public HandleCommand(): void
   {
         this.RunBashCommand();
   }

}