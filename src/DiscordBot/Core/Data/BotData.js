"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Singleton Class storing an Instance of the Bot Data Manager
 */
class BotData {
    /**
     * Private constructor to prevent direct construction calls with `new`
     */
    constructor() {
        // Private to prevent direct construction calls with `new`
    }
    /**
     * Returns an Instance of the IBotDataManager
     * @param this
     * @returns
     */
    static Instance(Class) {
        const className = Class.name;
        if (!BotData.instances.has(className)) {
            BotData.instances.set(className, new Class());
        }
        return BotData.instances.get(className);
    }
    /**
    * Returns an Instance of the IBotDataManager
    * @param this
    * @returns
    */
    static InstanceByName(className) {
        if (!BotData.instances.has(className)) {
            throw new Error(`Instance ${className} doesn't exist`);
        }
        return BotData.instances.get(className);
    }
}
/**
 * Instances of Singleton Classes
 */
BotData.instances = new Map();
exports.default = BotData;
