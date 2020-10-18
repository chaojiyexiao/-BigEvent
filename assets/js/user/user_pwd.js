
$(function () {
    //1.为提交按钮添加点击事件
    $('#btnSubmit').on('click', function () {
        changePwd();
    });
})


//2.修改 用户的密码-------------------
function changePwd() {
    //a.通过jq 获取  表单数据（原密码  和新密码，因为 确认信密码没有加name）
    var strData = $('#fromChangePwd').serialize();
    console.log(strData);
    //b.提交 到  重置密码接口
    $.ajax({
        url: '/my/updatepwd',
        method: 'post',
        data: strData,
        success: function (res) {
            console.log(res);
            // 如果修改不成功，提示消息
            if (res.status !== 0) {
                layui.layer.msg(res.message);
            } else {
                //如果修改成功，则要求重新登录输入密码
                //a.提示消息
                layui.layer.msg(res.message, function () {
                    //b.删除本地token
                    localStorage.removeItem('token');
                    //c.跳转到login页面 -- 因为当前在 iframe中，所以 要上级window去跳转
                    window.parent.location.href = "/login.html";
                })

            }
        }
    });
}