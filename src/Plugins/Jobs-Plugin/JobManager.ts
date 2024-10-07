import SSHManager from "../SSH-Plugin/SSHManager";
import SyncInfo from "../SSH-Plugin/SyncInfo";
import Job from "./Job";


abstract class JobManager {

    /* <inheritdoc> */
    abstract JobGlobalDirectory: string;

    /* <inheritdoc> */
    public abstract JobCategory: string;

    /* <inheritdoc> */
    public abstract HostArchiveDirectory: string;

    /* <inheritdoc> */
    public abstract HostJobDirectory: string;

    constructor() {
    }

    /* <inheritdoc> */
    get JobLibraryDirectory(): string {
        if (!this.ValidPathValues())
            return "";

        return this.JobGlobalDirectory + "/" + this.JobCategory + "/" + Job.JobSubdirectory;
    }

    ///* <inheritdoc> */
    get ArchiveLibraryDirectory(): string {
        if (!this.ValidPathValues())
            return "";

        return this.JobGlobalDirectory + "/" + this.JobCategory + "/" + Job.ArchiveSubdirectory;
    }

    /* <inheritdoc> */
    private ValidPathValues(): boolean {
        if (this.JobGlobalDirectory === "")
            throw new Error("Job Default Directory is not Set, Set the values of JobGlobalDirectory in the Class");

        if (this.JobCategory === "")
            throw new Error("Job Category is not Set, Set the value of JobCategory in the Class");

        return true;
    }

    GetArchiveSyncCommand(syncInfo: SyncInfo, destinationPath: string): string {
        return SSHManager.GetSCPCommand(syncInfo, this.HostArchiveDirectory, destinationPath, true);
    }

    GetHostArchiveCopyCommand(syncInfo: SyncInfo, jobName: string, destinationPath: string): string {
        const path = this.HostArchiveDirectory + "/" + jobName;
        return SSHManager.GetSCPCommand(syncInfo, path, destinationPath, true);
    }

    GetHostJobCopyCommand(syncInfo: SyncInfo, jobName: string, destinationPath: string): string {
        const path = this.HostJobDirectory + "/" + jobName;
        return SSHManager.GetSCPCommand(syncInfo, path, destinationPath, true);
    }

}

export default JobManager;