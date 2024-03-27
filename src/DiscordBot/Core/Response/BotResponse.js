"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
