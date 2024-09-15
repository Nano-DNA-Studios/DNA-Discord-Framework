import CommandData from '../Data/CommandData';

/**
 * Interface describing the structure for a Command Handler
 */
interface ICommandHandler{

    /**
     * Handles Discord Bot Command Execution
     * @param interaction Command Interaction
     * @param client Discord Bot Client
     * @param BotDataManager Data Manager
     */
    HandleCommand(commandData: CommandData): Promise<void>
}

export default ICommandHandler;