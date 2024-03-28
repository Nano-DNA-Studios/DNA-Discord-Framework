
/**
 * Describes the information required to connect to a device through SSH
 */
class SSHConnectionInfo {

    /**
     * The Host IP Address
     */
    public Host:string;

    /**
     * The Port of the SSH Connection
     */
    public Port:number;

    /**
     * The Username of the Account to connect to
     */
    public Username:string;

    /**
     * The Password of the Account to connect to
     */
    public Password:string;

/**
 * Initializes the SSH Connection Information, this will be used to connect to a device through SSH 
 * @param host Host IP Address
 * @param username Username of the Account to connect to
 * @param port Port of the SSH Connection
 * @param password The Password of the Account to connect to
 */
    constructor(host: string, username: string, port: number, password: string) {
        this.Host = host;
        this.Port = port;
        this.Username = username;
        this.Password = password;
    }
}

export default SSHConnectionInfo;