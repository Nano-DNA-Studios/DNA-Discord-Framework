import OptionTypesEnum from "../Enums/OptionTypes";
import ICommandOptionChoice from "./ICommandOptionChoice";

/**
 * Describes the structure of a commands option
 */
interface ICommandOption 
{
    /**
     * Describes the Value type the option will take
     */
    type: OptionTypesEnum;

    /**
     * The name of the option
     */
    name: string;

    /**
     * The description of the option
     */
    description: string;

    /**
     * Whether the option is required
     */
    required: boolean;

    /**
     * The choices for the option
     */
    choices?: ICommandOptionChoice[];
}

export default ICommandOption;