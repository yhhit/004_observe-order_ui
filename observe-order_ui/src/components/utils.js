//转换时间戳为本地时间
exports.getLocalTime=function(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    //转换日期为yyyy-MM-dd HH:mm:ss格式
    // let date = new Date(parseInt(nS) * 1000);
    // let Y = date.getFullYear();
    // let M = date.getMonth() + 1;
    // let D = date.getDate();
    // let H = date.getHours();
    // let m = date.getMinutes();
    // let s = date.getSeconds();
    // if (M < 10) {
    //     M = '0' + M;
    // }
    // if (D < 10) {
    //     D = '0' + D;
    // }
    // if (H < 10) {
    //     H = '0' + H;
    // }
    // if (m < 10) {
    //     m = '0' + m;
    // }
    // if (s < 10) {
    //     s = '0' + s;
    // }
    // return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}
