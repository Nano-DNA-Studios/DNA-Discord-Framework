import BotDataManager from "./src/Bot/BotDataManager";
import DiscordBot from "./src/Bot/DiscordBot";


let Bot = new DiscordBot(BotDataManager);

Bot.StartBot();