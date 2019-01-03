var ajax = ({ url, method = "GET", data = {}, async = true, success, error, resType = "", headers = {} }) => {//箭头函数相当于 匿名函数， 简化了函数的定义
    //错误判断 url为必填项 
    if (!url || url === '') {
        throw new Error('请求地址不能为空');
    }
    //变量声明
    let dataArr = [];
    let dataStr = "";
    let xhr = new XMLHttpRequest();//不兼容低版本浏览器 
    let formData = new FormData();
    //将小写转换成大写
    method = method.toUpperCase();

    //初始化data 
    switch (method) {
        case 'POST':
            for (let key in data) {
                formData.append(`${key}`, `${headers[key]}`);//将data转换成 FormData 对象的字段 
            }
            break;
        case 'GET':
            for (let key in data) {
                dataArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
            }
            strData = dataArr.join('&');
            break;
    }
    //设置返回数据格式 
    if (typeof async === 'boolean' && async) {//如果设置了同步就不能设置返回数据格式 
        if(typeof resType === 'string'){ 
            xhr.responseType = resType; // 在不设置responseType的时候默认为 text 
        } else{ throw new Error('设置返回数据格式时，请使用字符串类型'); 
        } 
    } //发起请求 
    switch (method){ 
        case 'POST': 
            xhr.open(method , url , async); 
        break; 
        case 'GET': 
            xhr.open(method , `${url}?${strData}` , async); 
        break; 
    }
    //设置请求头 必须在 xhr.open() 后才可以 
    //判断是否设置 
    if(typeof headers === 'object' && Object.keys(headers).length !== 0){ 
        //循环 headers 设置请求头 
        for(let key in headers){ 
            xhr.setRequestHeader(`${key}`,`${headers[key]}`);//`${}`字符串占位符拼接字符串
            // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
        } 
        //console.log(Object.keys(headers));//返回一个数组，数组成员是对象中所有的键 
        //console.log(Object.values(headers));//返回一个数组，数组成员是对象中所有的值 
    }
    xhr.send(formData);//发送数据 
    //监听状态 
    xhr.onreadystatechange = ()=>{ 
        if(xhr.readyState === 4){ 
            let res = xhr.response; 
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){ 
                typeof success === 'function' && success(res); 
            } else{ typeof error === 'function' && error(res); 
            } 
        } 
    } 
}


ajax({
    url:'',
    method:'post',
    resType:'json',
    headers:{
        id:123,
        name:123,
        key:123,
    },
    data:{
        name: "yhtx",
        id: "1997"
    },
    success(res){
        console.log(res);
    },
    error(){
        console.log('error')
    },
});
