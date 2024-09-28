"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Stores the info needed to connect to a server via SSH.
 */
class SSHInfo {
    constructor(hostname, port, username, password) {
        this.HostName = hostname;
        this.Port = port;
        this.Username = username;
        this.Password = password;
    }
}
exports.default = SSHInfo;
