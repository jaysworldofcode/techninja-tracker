var cookie_name = 'tncookie';

function getCookie() {
    var dc = document.cookie;
    var prefix = cookie_name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function isSiteCookieExists() {
    var myCookie = getCookie(cookie_name);

    if (myCookie == null) {
        return false;
    } else {
        return true;
    }
}

function setCookie(value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = cookie_name + "=" + (value || "")  + expires + "; path=/";
}

function deleteCookie() {   
    document.cookie = cookie_name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


module.exports = { setCookie, deleteCookie, getCookie, isSiteCookieExists };