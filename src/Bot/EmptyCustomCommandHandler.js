"use strict";
/**
 * Empty Command Handler
 * @param dataManager Bot Data Manager
 * @param interaction Command Interaction
 * @param client Discord Bot Client
 */
function EmptyCustomCommandHandler(dataManager, interaction, client) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
module.exports = EmptyCustomCommandHandler;
