var form = layui.form;
$(function () {
    //a.添加layui的自定义规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    //b.发送异步请求，获取用户基本信息
    getUserInfo();

    // c.重置功能
    $('#btnReset').on('click', function () {
        //调用方法  重新请求用户信息  并填充到表单中
        getUserInfo();
    })

    //d.提交修改功能
    $('#btnSubmit').on('click', function () {
        modifyUserInfo()
    })
})



// 1.获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(res);
            form.val('formUserInfo', res.data)
        }
    });
}



// 2.提交修改的用户信息--------------------------
function modifyUserInfo() {
    //a.获取表单的数据 username=jkdhfk&id=545612&.....
    var dataStr = $('#formModify').serialize();
    //b.异步提交到服务器  修改数据的  接口
    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: dataStr,
        success: function (res) {
            if (res.status === 0) {
                layui.layer.msg(res.message);
                window.parent.getUserInfo();

            }

        }
    })
}
