
interface IRESTFULRequest {
    hostname: string| undefined;
    port: number| undefined;
    path: string| undefined;
    method: string| undefined;
    headers: {
        Accept: string| undefined;
        Authorization: string| undefined;
        'Content-Type'?: string| undefined;
        'Content-Length'?: number| undefined;
    };
    maxRedirects: number| undefined;
    maxBodyLength?: number| undefined;
    body?: any| undefined;
}

export default IRESTFULRequest;
