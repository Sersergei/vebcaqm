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
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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
        jQuery.post(url,params,callback);

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

Number.prototype.n2 = function () {
    return this < 10 ? "0" + this : this;
};

Date.prototype.getString = function () {
    return [
        this.getDate(),
        ".",
        (this.getMonth() + 1).n2(),
        ".",
        this.getFullYear(),
        " ",
        this.getHours(),
        ":",
        this.getMinutes().n2(),
        ":",
        this.getSeconds().n2()
    ].join("");
};

var Media = {
    media: navigator.getUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia,
    url: window.URL.createObjectURL || window.URL.msCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.webkitCreateObjectURL,
    video: null,
    canvas: null,
    ctx: null,
    init: function (video, canvas) {
        if (!Media.media || !Media.url)
            return alert("Не поддерживается Вашим браузером!");

        Media.canvas = canvas;
        Media.ctx = canvas.getContext("2d");
        Media.video = video;

        Media.media.call(navigator, {video: true}, Media.onSuccess, Media.onError);
    },
    onSuccess: function (stream) {
        var stream = Media.url(stream);
        Media.video.src = stream;
        Media.video.play();
        setTimeout(function () {
            Media.save(Media.getImage());
        }, 4000);
    },
    getImage: function () {
        Media.canvas.width = Media.canvas.width;
        Media.ctx.drawImage(Media.video, 0, 0, Media.canvas.width, Media.canvas.height);
        Media.ctx.font = "22px Tahoma";
        var date = new Date().getString();

        Media.ctx.fillStyle = "white";
        Media.ctx.fillText(date, 9, Media.canvas.height - 16);

        Media.ctx.fillStyle = "black";
        Media.ctx.fillText(date, 10, Media.canvas.height - 15);

        return Media.canvas.toDataURL("image/png", .9);
    },
    save: function (data) {
        ajax.post("save", {
            data: data
        }, function (data) {
            Media.save(Media.getImage());
            if (data.success)
                g("time").innerHTML = "Время: " + (new Date(data.time * 100000).toLocaleString());
        });
    },
    onError: function(error) {
        alert("Видеокамера недоступна");
    }
};
window.onload = function (event) {
    Media.init(g("video"), g("canvas"));
};