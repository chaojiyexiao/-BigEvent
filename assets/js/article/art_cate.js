// 打开的新增窗口的id
var addWindowId = null;
$(function () {
    // 请求分类列表数据
    getArtCateList();
    //2.为添加分类按钮添加点击事件，并显示 新增面板
    $('#btnShowAdd').on('click', function () {
        addWindowId = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });

    //3.为  新增表单 添加 提交事件
    $('body').on('submit', '#formAddPanel', function (e) {
        e.preventDefault();
        //调用 新增分类 方法
        addArtCate();
    })
    //4.为动态生成的 数据行里的 修改按钮 代理 点击事件
    $('.layui-table tbody').on('click', '.btn-edit', function (e) {
        // showEditPanel();
        //1.获取  当前行中 数据：id，分类名，分类别名
        var oldData = {
            Id: this.dataset.id,
            name: $(this).parent().prev('td').prev('td').text().trim(),
            alias: $(this).parent().prev('td').text().trim()
        };
        //2.显示  编辑面板，同时显示数据
        showEditPanel(oldData);
        // console.log(oldData);
        // var cayteID = this.dataset.id;
        // var cateAlias = $(this).parent().prev('td').text().trim();
        // var cateName = $(this).parent().prev('td').prev('td')[0].text().trim();
        //3.为  编辑面板的表单提交事件 绑定方法
        $('body').on('submit', '#formEditPanel', function (e) {
            e.preventDefault();//阻断表单提交
            //执行提交
            editArtCate();
        });
    });

    //5.为  动态生成的 数据行里的  删除按钮 代理 点击事件
    $('.layui-table tbody').on('click', '.btn-del', function (e) {
        // console.log(this.dataset.did);
        delArtCate(this.dataset.did);
    })
})


//1.请求分类列表数据--------------------
function getArtCateList() {
    $.ajax({
        url: '/my/article/cates',
        method: 'get',
        success(res) {
            //判断 是否获取成功
            if (res.status === 0) {
                var strHtml = template('tpl-row', res.data);
                $('.layui-table tbody').html(strHtml);
            }
        }

    })
}

// 2.新增分类方法------------------------
function addArtCate() {
    $.ajax({
        url: '/my/article/addcates',
        method: 'post',
        data: $('#formAddPanel').serialize(),
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            getArtCateList();
            layui.layer.close(addWindowId);
        }
    })
}

//3. 显示  编辑窗口-------------------------------------
function showEditPanel(oldData) {
    //打开面板，并保存面板的id
    addWindowId = layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#editPanel').html()
    });

    layui.form.val('formEdit', oldData);
    // console.log();
    // $('.btnEditOk').on('click', function () {

    // })
}

//4. 修改分类 方法----------------------------
function editArtCate() {
    //a.获取  表单数据
    var dataStr = $('#formEditPanel').serialize();
    //b.异步提交
    $.ajax({
        url: '/my/article/updatecate',
        method: 'post',
        data: dataStr,
        success(res) {
            layui.layer.msg(res.message);
            if (res.status === 0) {
                //a.刷新分类列表
                getArtCateList();
                //b.关闭当前窗口
                layui.layer.close(addWindowId);
            }
        }

    })
}

//5.  删除分类  方法--------------------------------
function delArtCate(cateId) {
    layui.layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
        //do something

        layer.close(index);

        //a.异步请求 分类删除接口
        $.ajax({
            url: '/my/article/deletecate/' + cateId,
            method: 'get',
            success(res) {
                layui.layer.msg(res.message);
                if (res.status === 0) {
                    //重新加载列表数据
                    getArtCateList();
                }
            }
        });
        //关闭 消息窗
        layer.close(index);
    });
}
