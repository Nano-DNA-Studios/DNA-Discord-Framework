"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Message Object that is sent as a Response to the User when using a Command
 */
class BotResponse {
    constructor() {
        /**
         * The Message Content of the Response
         */
        this.content = "";
        /**
         * The Files associated with the Response
         */
        this.files = [];
    }
}
exports.default = BotResponse;
