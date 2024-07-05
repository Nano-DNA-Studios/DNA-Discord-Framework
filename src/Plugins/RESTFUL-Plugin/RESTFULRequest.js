"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const follow_redirects_1 = require("follow-redirects");
const RESTFULResponseStatusEnum_1 = __importDefault(require("./RESTFULResponseStatusEnum"));
class RESTFULRequest {
    constructor(init) {
        this.GetRESTFULResponseStatus = (statusCode) => {
            switch (statusCode) {
                case 200:
                    return RESTFULResponseStatusEnum_1.default.SUCCESS;
                case 400:
                    return RESTFULResponseStatusEnum_1.default.ERROR;
                case 401:
                    return RESTFULResponseStatusEnum_1.default.UNAUTHORIZED;
                default:
                    return RESTFULResponseStatusEnum_1.default.ERROR;
            }
        };
        this.WriteBody = (content) => {
            let stringifiedContent = JSON.stringify(content);
            this.body = stringifiedContent;
            this.headers["Content-Type"] = 'application/json';
            this.headers["Content-Length"] = Buffer.byteLength(stringifiedContent);
        };
        this.hostname = (init === null || init === void 0 ? void 0 : init.hostname) || '';
        this.port = (init === null || init === void 0 ? void 0 : init.port) || 0;
        this.path = (init === null || init === void 0 ? void 0 : init.path) || '';
        this.method = (init === null || init === void 0 ? void 0 : init.method) || '';
        this.headers = (init === null || init === void 0 ? void 0 : init.headers) || { Accept: '', Authorization: '' };
        this.maxRedirects = (init === null || init === void 0 ? void 0 : init.maxRedirects) || 0;
        this.maxBodyLength = init === null || init === void 0 ? void 0 : init.maxBodyLength;
        this.body = init === null || init === void 0 ? void 0 : init.body;
    }
    SendRequest() {
        return new Promise((resolve, reject) => {
            let response;
            response = { status: this.GetRESTFULResponseStatus(RESTFULResponseStatusEnum_1.default.ERROR), message: '', error: '' };
            const req = follow_redirects_1.http.request(this, res => {
                response.status = this.GetRESTFULResponseStatus(res.statusCode);
                res.on('data', d => {
                    response.message += d.toString();
                });
                res.on('end', () => {
                    resolve(response); // Resolve the promise with the full response
                });
            });
            req.on('error', e => {
                response.error += e.message;
                reject(e); // Reject the promise on error
            });
            if (this.method === 'POST' && this.body)
                req.write(this.body);
            req.end();
        });
    }
}
RESTFULRequest.DefaultError = () => {
    return { status: RESTFULResponseStatusEnum_1.default.ERROR, message: '', error: 'An Error Occurred' };
};
exports.default = RESTFULRequest;
