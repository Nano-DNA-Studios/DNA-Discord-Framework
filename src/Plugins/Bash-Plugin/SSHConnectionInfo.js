"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Describes the information required to connect to a device through SSH
 */
class SSHConnectionInfo {
    /**
     * Initializes the SSH Connection Information, this will be used to connect to a device through SSH
     * @param host Host IP Address
     * @param username Username of the Account to connect to
     * @param port Port of the SSH Connection
     * @param password The Password of the Account to connect to
     */
    constructor(host, username, port, password) {
        this.Host = host;
        this.Port = port;
        this.Username = username;
        this.Password = password;
    }
}
exports.default = SSHConnectionInfo;
