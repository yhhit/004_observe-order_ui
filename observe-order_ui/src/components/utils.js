//获取当前页view数据
exports.getCurrentPageView=function(config){
    view=config.view;
    let firstIndex=(config.currentPage-1)*config.pageSize;
    let lastIndex=firstIndex+config.pageSize;
    if(lastIndex>view.length){
        lastIndex=view.length;
    }
    let currentPageView=view.slice(firstIndex,lastIndex);
    return currentPageView
}