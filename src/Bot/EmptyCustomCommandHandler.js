"use strict";
function EmptyCustomCommandHandler(dataManager, interaction, client) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
module.exports = EmptyCustomCommandHandler;
