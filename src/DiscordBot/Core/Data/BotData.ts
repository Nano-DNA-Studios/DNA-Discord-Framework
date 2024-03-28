import IBotDataManager from "../Interfaces/IBotDataManager";

/**
 * Singleton Class storing an Instance of the Bot Data Manager
 */
class BotData
{
    /**
     * Instances of Singleton Classes
     */
    private static instances: Map<string, any> = new Map();

    /**
     * Private constructor to prevent direct construction calls with `new`
     */
    private constructor() {
        // Private to prevent direct construction calls with `new`
    }

    /**
     * Returns an Instance of the IBotDataManager
     * @param this 
     * @returns 
     */
    public static Instance<T extends IBotDataManager>(Class: new () => T ): T {
        const className = (Class as any).name;

        if (!BotData.instances.has(className)) {
            BotData.instances.set(className, new Class());
        }

        return BotData.instances.get(className);
    }
}

export default BotData;