//转换时间戳为本地时间
exports.getLocalTime=function(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
