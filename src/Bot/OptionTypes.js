"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionTypes;
(function (OptionTypes) {
    OptionTypes[OptionTypes["SubCommand"] = 1] = "SubCommand";
    OptionTypes[OptionTypes["SubCommandGroup"] = 2] = "SubCommandGroup";
    OptionTypes[OptionTypes["String"] = 3] = "String";
    OptionTypes[OptionTypes["Integer"] = 4] = "Integer";
    OptionTypes[OptionTypes["Boolean"] = 5] = "Boolean";
    OptionTypes[OptionTypes["User"] = 6] = "User";
    OptionTypes[OptionTypes["Channel"] = 7] = "Channel";
    OptionTypes[OptionTypes["Role"] = 8] = "Role";
    OptionTypes[OptionTypes["Mentionable"] = 9] = "Mentionable";
    OptionTypes[OptionTypes["Number"] = 10] = "Number";
    OptionTypes[OptionTypes["Attachment"] = 11] = "Attachment";
})(OptionTypes || (OptionTypes = {}));
exports.default = OptionTypes;
