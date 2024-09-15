import BotCommunication from "./BotCommunication";

class DefaultBotCommunication extends BotCommunication {
    public UpdateCommunication(): Promise<void> {
        return new Promise((resolve, reject) => { resolve(); });
    }

    constructor() {
        super();
        this.content = "Empty Message"
    }
}

export default DefaultBotCommunication