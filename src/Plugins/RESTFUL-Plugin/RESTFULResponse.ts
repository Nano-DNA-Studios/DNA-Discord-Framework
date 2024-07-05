import RESTFULResponseStatusEnum from "./RESTFULResponseStatusEnum";

interface RESTFULResponse 
{
    status: RESTFULResponseStatusEnum;
    message: string;
    error: string;
}

export default RESTFULResponse;