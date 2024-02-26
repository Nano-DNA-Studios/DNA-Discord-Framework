import BotDataManager from './BotDataManager';
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';

/**
 * Empty Command Handler
 * @param dataManager Bot Data Manager
 * @param interaction Command Interaction
 * @param client Discord Bot Client
 */
function EmptyCustomCommandHandler(dataManager: BotDataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client): Promise<void> {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export = EmptyCustomCommandHandler;