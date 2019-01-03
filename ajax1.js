var ajax = function(url, method = "GET", data = {}, async = true, success, error, resType = "", headers = {}) {
    //设置变量默认值
    // method = mehtod || "GET";
    // async = async || true;//异步执行，后边的脚本不用等到ajax请求到数据之后才执行
    // data = data || "";
    // resType = resType || "";
    //数据校验
    if(!url || url === '') {
        throw new Error('url不能为空');//throw用来抛出异常
    }
    if(method==="GET" && data != "") {
        throw new Error('请将get请求参数写在url里');
    }
    method = method.toUpperCase();//将小写全部转换为大写
    if(window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject("Microsft.XMLHTTP");
    }
    xhr.open(method, url, async);//XMLHttpRequest.open()初始化 HTTP 请求参数
    //设置请求头
    //判断是否设置
    //循环 headers 设置请求头
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencodded");
    //设置返回数据格式
    if(async){//如果设置了同步就不能设置返回数据格式
        xhr.responseType = resType; //在未设置responseType的时候默认为Text
    }
    //send(data) 将请求发送到服务器data仅用于post
    xhr.send(data);
    //后面为HTTP响应
    xhr.onreadystatechange = function() {//onreadystatechange为存储函数，每当readystate值变化的时候都会调用该函数
        if(xhr.readyState == 4) {
            var res = xhr.response;//返回的响应
            if(xhr.status >=200 && xhr.statu <300 || xhr.status == 304) {//状态码为304表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本
                success && success(res);
            } else {
                error && error(res);
            }
        }
    }
}


ajax("","GET","",true,function(res){console.log(res);},function(error){console.log(error);},'json');
