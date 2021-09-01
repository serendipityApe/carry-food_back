/**
 * 时间戳转日期
 *
 * @param {string} shijianchuo 时间戳 字符串
 * @returns {string} 解析后的日期
 */
function format(shijianchuo) {
    function add0(m) {
        return m < 10 ? "0" + m : m;
    }
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return (
        y + "-" + add0(m) + "-" + add0(d) + " " + add0(h) + ":" + add0(mm) + ":" + add0(s)
    );
}