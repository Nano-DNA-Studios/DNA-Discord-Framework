"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSHManager_1 = __importDefault(require("../SSH-Plugin/SSHManager"));
const Job_1 = __importDefault(require("./Job"));
class JobManager {
    constructor() {
    }
    /* <inheritdoc> */
    get JobLibraryDirectory() {
        if (!this.ValidPathValues())
            return "";
        return this.JobGlobalDirectory + "/" + this.JobCategory + "/" + Job_1.default.JobSubdirectory;
    }
    ///* <inheritdoc> */
    get ArchiveLibraryDirectory() {
        if (!this.ValidPathValues())
            return "";
        return this.JobGlobalDirectory + "/" + this.JobCategory + "/" + Job_1.default.ArchiveSubdirectory;
    }
    /* <inheritdoc> */
    ValidPathValues() {
        if (this.JobGlobalDirectory === "")
            throw new Error("Job Default Directory is not Set, Set the values of JobGlobalDirectory in the Class");
        if (this.JobCategory === "")
            throw new Error("Job Category is not Set, Set the value of JobCategory in the Class");
        return true;
    }
    GetArchiveSyncCommand(syncInfo, destinationPath) {
        return SSHManager_1.default.GetSCPCommand(syncInfo, this.HostArchiveDirectory, destinationPath, true);
    }
    GetHostArchiveCopyCommand(syncInfo, jobName, destinationPath) {
        const path = this.HostArchiveDirectory + "/" + jobName;
        return SSHManager_1.default.GetSCPCommand(syncInfo, path, destinationPath, true);
    }
    GetHostJobCopyCommand(syncInfo, jobName, destinationPath) {
        const path = this.HostJobDirectory + "/" + jobName;
        return SSHManager_1.default.GetSCPCommand(syncInfo, path, destinationPath, true);
    }
}
exports.default = JobManager;
