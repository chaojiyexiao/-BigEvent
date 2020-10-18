// ajaxPrefilter方法
//为jq的异步请求  新增一个 回调函数，每次jq异步请求之前，都会执行一下这个函数
$.ajaxPrefilter(function (opt) {
    //1.基地址改造： opt.url = 基地址+'/api/login'
    opt.url = 'http://ajax.frontend.itheima.net' + opt.url;

    // 2.自动将localstorage 中的 token 读取并加入到请求报文中，一起发给服务器
    // 2.1 判断 当前url中是否包含了/my，如果包含，则发送 token
    if (opt.url.indexOf('/my/') > -1) {
        opt.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    //3.统一处理 服务端返回的 未登录 错误
    opt.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //a.提示用户没有权限
            alert('你的登录失效了，笨比');
            //b.删除 localstorage 中可能存在的伪造的 token
            localStorage.removeItem('token');
            // c.页面跳转到 login
            location.href = "/login.html";
        }
    }
})