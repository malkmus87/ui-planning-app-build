import cookieHandler from './CookieHandler';
export default class JsonRequestHandler{
    constructor({mainPath}){
        this.setMainPath(mainPath);
        this.tokenCookieName='token';     
        this.headers={
            'Content-Type': 'application/json'
        }
    }
    setTokenCookieName(name){
        this.tokenCookieName=name;
    }
    setMainPath(mainPath){
        this.mainPath=mainPath;
    }
    setHeaders(headers){
        this.headers={
            ...headers,
            'Content-Type':'application/json'
        }
    }
    async get(from){
        const url=this.mainPath+'/'+from;
        const bearerToken='Bearer '+cookieHandler.getCookie(this.tokenCookieName);
        const response=await fetch(
            url,
            {
               method:'get',
               headers:{
                   ...this.headers,
                   'Authorization':bearerToken
               }
            }
        );
        return response;
    }
    async post(to,value){
        const url=this.mainPath+'/'+to;
        const jsonConvertedValue=JSON.stringify(value);
        const bearerToken='Bearer '+cookieHandler.getCookie(this.tokenCookieName);
        const response=await fetch(
            url,
            {
              method:'post',
              headers:{
                  ...this.headers,
                  'Authorization':bearerToken
              },
              body:jsonConvertedValue
            }
        );
        return response;
    }
    async patchID(to,id,value){
        const url=this.mainPath+'/'+to+'/'+id;
        const jsonConvertedValue=JSON.stringify(value);
        const response=await fetch(
            url,
            {
              method:'PATCH',
              headers:this.headers,
              body:jsonConvertedValue
            }
        );
        return response;
    }
}