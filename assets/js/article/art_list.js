
//入口函数
$(function () {
    //1.1 请求 文章列表
    getArtList();
})

//0.全局变量 默认查询参数对象------------
let queryData = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
};

//1.请求 文章列表--------------------
function getArtList() {
    $.ajax({
        url: '/my/article/list',
        method: 'get',
        data: queryData,
        success(res) {
            var strHtml = template('tpl-row', res.data);
            $('.layui-table tbody').html(strHtml);
        }
    })
}

//2.定义美化时间的过滤器 -----------------------
template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}
