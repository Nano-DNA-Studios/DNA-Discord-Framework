
/**
 * Interface Representing A Choice that can be selected for a Command Option
 */
interface ICommandOptionChoice
{
    /**
     * The name of the choice
     */
    name: string;

    /**
     * The value of the choice
     */
    value: Number | string;
}

export default ICommandOptionChoice;