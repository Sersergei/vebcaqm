/**
 * Created by ohonko on 13.12.2016.
 */
function g (id) {
    return document.getElementById(id);
};
var ajax = {
    init: function (method, url, query, callback) {
        query = typeof query === "string" ? query : ajax._params(query);

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(query);
        xhr.onreadystatechange = function (event) {
            if (xhr.readyState === 4)
                callback && callback(JSON.parse(xhr.responseText));
        };
    },
    get: function (url, params, callback) {
        ajax.init("GET", url + "?" + ajax._params(params), null, callback)
    },
    post: function (url, params, callback) {
        ajax.init("POST", url, params, callback);
    },
    _params: function (params) {
        if (typeof params === "string" || params == null)
            return params;
        var data = [], key, d = encodeURIComponent;
        for (key in params)
            data.push(d(key) + "=" + d(params[key]));
        return data.join("&");
    }
};
function setLoad () {
    ajax.get("now", "", function (data) { //берется изображение
        g("img").src = data.image;
    });
};

setInterval(setLoad, 50);