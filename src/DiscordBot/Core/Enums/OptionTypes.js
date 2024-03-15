"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionTypesEnum;
(function (OptionTypesEnum) {
    OptionTypesEnum[OptionTypesEnum["SubCommand"] = 1] = "SubCommand";
    OptionTypesEnum[OptionTypesEnum["SubCommandGroup"] = 2] = "SubCommandGroup";
    OptionTypesEnum[OptionTypesEnum["String"] = 3] = "String";
    OptionTypesEnum[OptionTypesEnum["Integer"] = 4] = "Integer";
    OptionTypesEnum[OptionTypesEnum["Boolean"] = 5] = "Boolean";
    OptionTypesEnum[OptionTypesEnum["User"] = 6] = "User";
    OptionTypesEnum[OptionTypesEnum["Channel"] = 7] = "Channel";
    OptionTypesEnum[OptionTypesEnum["Role"] = 8] = "Role";
    OptionTypesEnum[OptionTypesEnum["Mentionable"] = 9] = "Mentionable";
    OptionTypesEnum[OptionTypesEnum["Number"] = 10] = "Number";
    OptionTypesEnum[OptionTypesEnum["Attachment"] = 11] = "Attachment";
})(OptionTypesEnum || (OptionTypesEnum = {}));
exports.default = OptionTypesEnum;
