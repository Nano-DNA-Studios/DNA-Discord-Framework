"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class managing SSH Related commands
 */
class SSHManager {
    /**
     * Returns the proper SCP Command to copy a file from a remote server to the local machine
     * @param sshInfo The SSH Info to connect to the server
     * @param sourcePath The Path of the file to copy
     * @param destinationPath The Destination Path to copy the file to
     * @param isDirectory If the sourcePath is a directory
     * @returns A string containing the SCP Command
     */
    static GetSCPCommand(sshInfo, sourcePath, destinationPath, isDirectory = false) {
        const user = sshInfo === null || sshInfo === void 0 ? void 0 : sshInfo.Username;
        const hostName = sshInfo === null || sshInfo === void 0 ? void 0 : sshInfo.HostName;
        const port = sshInfo === null || sshInfo === void 0 ? void 0 : sshInfo.Port;
        let command = "";
        let recursive = "";
        if (isDirectory) {
            sourcePath += "/";
            recursive = "-r ";
        }
        if (!(user && destinationPath && hostName)) {
            const command = `scp ${recursive}-P port serverUser@hostName:${sourcePath} /Path/on/local/device`;
            return "```" + command + "```";
        }
        if (port == 0)
            command = `scp ${recursive}${user}@${hostName}:${sourcePath} ${destinationPath}`;
        else
            command = `scp ${recursive}-P ${port} ${user}@${hostName}:\"${sourcePath}\" \"${destinationPath}\"`;
        return "```" + command + "```";
    }
}
exports.default = SSHManager;
