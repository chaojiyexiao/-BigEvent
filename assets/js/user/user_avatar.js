
$(function () {


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //-------------------------------------
    //为上传按钮添加点击事件  模拟文件框被点击
    $('#btnUpload').on('click', function () {
        $('#file').click();
    })

    //为文件选择框  绑定change事件
    // 触发时机：
    //文件选择框 选择的文件发生改变
    // 由选中了文件到 没选中文件 （取消） 也会触发
    $('#file').on('change', function (e) {
        var list = e.target.files;
        // 判断  如果没有选中图片则提示消息
        if (list.length === 0) {
            return layui.layer.msg('请选择要上传的图片！')
        }

        //如果选中了新的图片，则设置给 图片裁剪区
        //a.获取选中的文件图片
        var file = e.target.files[0]
        //b.为文件图片创建虚拟路径
        var newImgURL = URL.createObjectURL(file)
        //c.设置给  裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });


    //-----------------------------
    // 确定上传图片
    $('#btnOK').on('click', function () {
        //a.获取 选中图片的 base64格式数据
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //b.提交到服务器 上传接口
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL

            },
            success: function (res) {
                // 一旦收到服务器数据后，就立即显示 提示消息
                layui.layer.msg(res.message);
                //如果上传成功，则调用父页面的方法重新加载用户信息区
                if (res.status === 0) {
                    window.parent.getUserInfo()
                }

            }
        })
    })
})