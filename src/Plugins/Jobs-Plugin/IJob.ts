import { Attachment } from "discord.js";
import JobManager from "./JobManager";
import SizeFormat from "./SizeFormat";


/**
 * Insterface that Describes a Job
 */
interface IJob {

    /**
     * Name of the Job
     */
    JobName: string;

    /**
     * The Start Time of the Job
     */
    StartTime: number;

    /**
     * The Directory the Job is Stored in
     */
    JobDirectory: string;

    /**
     * The Directory the Job Archive is Stored in
     */
    ArchiveDirectory: string;
    
    /**
     * The Author / Creator of the Job, Just the Discord User Name
     */
    JobAuthor : string;

    /**
     * Boolean Flag to Indicate if the Job has Finished
     */
    JobFinished: boolean;

    /*
     * Boolean Flag to Indicate if the Job was Successful
     */
    JobSuccess: boolean;

    /**
     * The Job Manager that is Handling the Job
     */
    JobManager : JobManager;

    /**
     * The Job 
     */
    JobElapsedTime (): string;

    /**
     * The Resource Usage of the Job
     */
    JobResourceUsage (): Record<string, number>;

    /**
     * Creates the Job and Archive Directories, Must have the JobDefaultDirectory and JobCategory Set beforehand
     */
    CreateDirectories(): void;

    /**
     * Downloads all the Attachments to the Job Directory
     * @param attachments The Attachments to Download
     */
    DownloadFiles(attachments: (Attachment | null)[]) : void;

    /**
     * Downloads a Single Attachment to the Job Directory
     * @param attachement The Attachment to Download
     */
    DownloadFile(attachement: Attachment | null) : void;

    /**
     * Copies all Files in the Job Directory to the Archive Directory
     */
    CopyFilesToArchive() : void;

     /**
      * Returns True if the File is Larger than the size specified
      * @param filePath The Path to the File to check
      * @param maxSize The Maximum Size of the File
      * @param sizeFormat The Size Format of the File (B, KB, MB, GB, ...)
      */
     IsFileLarger (filePath: string, maxSize: number, sizeFormat: SizeFormat): boolean;

     /**
      * Runs the Job
      */
     RunJob(): Promise<void>;
}

export default IJob;