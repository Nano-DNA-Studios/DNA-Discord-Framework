import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import BotDataManager from './BotDataManager';
import CommandLogger from './CommandLogger';

/**
 * Interface describing the structure for a Command Handler
 */
interface ICommandHandler extends CommandLogger{

    /**
     * Handles Discord Bot Command Execution
     * @param interaction Command Interaction
     * @param client Discord Bot Client
     * @param BotDataManager Data Manager
     */
    HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, BotDataManager: BotDataManager): Promise<void>
}

export = ICommandHandler;