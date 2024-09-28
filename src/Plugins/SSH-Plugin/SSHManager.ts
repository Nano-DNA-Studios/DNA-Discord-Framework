import SSHInfo from "./SSHInfo";

/**
 * Class managing SSH Related commands
 */
class SSHManager 
{
    /**
     * Returns the proper SCP Command to copy a file from a remote server to the local machine
     * @param sshInfo The SSH Info to connect to the server 
     * @param sourcePath The Path of the file to copy
     * @param destinationPath The Destination Path to copy the file to
     * @param isDirectory If the sourcePath is a directory
     * @returns A string containing the SCP Command
     */
    public static GetSCPCommand(sshInfo: SSHInfo, sourcePath : string, destinationPath: string, isDirectory: boolean = false): string {
        const user = sshInfo?.Username;
        const hostName = sshInfo?.HostName;
        const port = sshInfo?.Port;
        let command = "";
        let recursive = "";

        if (isDirectory)
        {
            sourcePath += "/";
            recursive = "-r ";
        }

        if (!(user && destinationPath && hostName)) {
            const command = `scp ${recursive}-P port serverUser@hostName:\"${sourcePath}\" \"/Path/on/local/device\"`;
            return "```" + command + "```"
        }

        if (port == 0)
            command = `scp ${recursive}${user}@${hostName}:\"${sourcePath}\" \"${destinationPath}\"`;
        else
            command = `scp ${recursive}-P ${port} ${user}@${hostName}:\"${sourcePath}\" \"${destinationPath}\"`;

        return "```" + command + "```";
    }
}

export default SSHManager;