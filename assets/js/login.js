//声明全局变量
var $loginBox, $regBox; //登录页面的两个超链接

$(function () {
    $loginBox = $('.login-box');
    $regBox = $('.reg-box');


    // 1.dom树准备完毕后 为去登录和去注册超链接添加点击事件
    $('#link-reg').on('click', function () {
        // 隐藏 登录框
        $loginBox.hide();
        // 显示 注册框
        $regBox.show();
    });

    // 2.dom树准备完毕后 为去注册超链接添加点击事件
    $('#link-login').on('click', function () {
        // 显示 登录框
        $loginBox.show();
        // 隐藏 注册框
        $regBox.hide();
    });


    //为 登录和注册 添加新的 验证规则

    //通过layui.form.verify() 函数自定义校验规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //重复密码验证，新参val 会获取确认密码框的值
        repwd: function (val) {
            var pwdStr = $('.reg-box [name=password]').val();

            if (pwdStr !== val) {
                return '两次密码不正确哦';
            }
        }

    });

    //---------------事件操作--------------
    //1.注册表单提交事件
    $('#formReg').on('submit', function (e) {
        // a.取消表单的默认提交行为
        e.preventDefault();
        //b.获取注册信息
        let data = {
            username: $('.reg-box [name=username]').val().trim(),
            password: $('.reg-box [name=password]').val().trim(),
        };
        //c.发送注册信息到 接口
        $.post('http://ajax.frontend.itheima.net' + '/api/reguser', data, function (res) {
            if (res.status !== 0) {
                layui.layer.msg(res.message);
            } else {
                layui.layer.msg(res.message, function () {
                    // 模拟点击  去登录按钮 进而触发点击事件，切换显示窗口
                    $('#link-login').click();
                    //清空注册表单的内容
                    $('#formReg')[0].reset();
                });
                // 将用户名和密码  设置给 登录窗体的  输入框
                $('.login-box [name=username]').val(data.username);
                $('.login-box [name=password]').val(data.password);
            }
        });
    })
    //2.登录表单的提交事件
    $('#formLogin').on('submit', function (e) {
        e.preventDefault();
        //a.获取用户名密码数据  urlencoded 格式 （键值对 字符串---查询字符串）
        var strData = $(this).serialize();
        //b.提交到 登录接口
        $.ajax({
            url: 'http://ajax.frontend.itheima.net' + '/api/login',
            method: 'post',
            data: strData,
            success: function (res) {
                // c.直接显示 登录结果， 并执行回调函数
                layui.layer.msg(res.message, function () {
                    // d.判断是否成功，就跳转
                    if (res.status === 0) {
                        location.href = '/index.html';
                    }
                });
            }
        });
    });
})

