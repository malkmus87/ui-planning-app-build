class CookieHandler{
    constructor(){
    }
    removeCookie(name){
        document.cookie=name+'=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    setCookie(name,value){
        if(name.length>0 && value!==undefined>0){
            document.cookie=name+'='+value+';';
        }
    }
    getCookie(requestedName){
        let cookies=document.cookie.split(';');
        let requestedCookie='';
        cookies.forEach(cookie=>{
            const [name,value]=cookie.split('=');
            if(name===requestedName){
                requestedCookie=value;
            }
        })
        return requestedCookie;
    }
}
export default new CookieHandler();