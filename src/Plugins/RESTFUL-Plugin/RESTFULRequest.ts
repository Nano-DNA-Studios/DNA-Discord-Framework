import { http } from "follow-redirects";
import RESTFULResponseStatusEnum from "./RESTFULResponseStatusEnum";
import RESTFULResponse from "./RESTFULResponse";
import IRESTFULRequest from "./IRESTFULRequest";

class RESTFULRequest implements IRESTFULRequest {

    public hostname: string | undefined;
    public port: number| undefined;
    public path: string| undefined;
    public method: string| undefined;
    public headers: { Accept: string| undefined; Authorization: string| undefined; 'Content-Type'?: string| undefined , 'Content-Length'?: number| undefined};
    public maxRedirects: number| undefined;
    public maxBodyLength?: number| undefined;
    public body?: any| undefined;

    constructor(init?: Partial<IRESTFULRequest>) {
        this.hostname = init?.hostname || '';
        this.port = init?.port || 0;
        this.path = init?.path || '';
        this.method = init?.method || '';
        this.headers = init?.headers || { Accept: '', Authorization: '' };
        this.maxRedirects = init?.maxRedirects || 0;
        this.maxBodyLength = init?.maxBodyLength;
        this.body = init?.body;
    }

    public SendRequest(): Promise<RESTFULResponse> {

        return new Promise<RESTFULResponse>((resolve, reject) => {

            let response: RESTFULResponse;

            response = { status: this.GetRESTFULResponseStatus(RESTFULResponseStatusEnum.ERROR), message: '', error: '' };

            const req = http.request(this, res => {
                response.status = this.GetRESTFULResponseStatus(res.statusCode);

                res.on('data', d => {
                    response.message += d.toString();
                });

                res.on('end', () => {
                    resolve(response);  // Resolve the promise with the full response
                });
            });

            req.on('error', e => {
                response.error += e.message;
                reject(e);  // Reject the promise on error
            });

            if (this.method === 'POST' && this.body) 
                req.write(this.body);
                
            req.end();
        });
    }

    private GetRESTFULResponseStatus = (statusCode: number | undefined): RESTFULResponseStatusEnum => {

        switch (statusCode) {
            case 200:
                return RESTFULResponseStatusEnum.SUCCESS;
            case 400:
                return RESTFULResponseStatusEnum.ERROR;
            case 401:
                return RESTFULResponseStatusEnum.UNAUTHORIZED;
            default:
                return RESTFULResponseStatusEnum.ERROR;
        }
    }

    public static DefaultError = (): RESTFULResponse => {
        return { status: RESTFULResponseStatusEnum.ERROR, message: '', error: 'An Error Occurred' };
    }

    public WriteBody = (content: object): void => {

        let stringifiedContent = JSON.stringify(content);

        this.body = stringifiedContent

        this.headers["Content-Type"] = 'application/json'
        
        this.headers["Content-Length"] = Buffer.byteLength(stringifiedContent)
    }

}

export default RESTFULRequest;