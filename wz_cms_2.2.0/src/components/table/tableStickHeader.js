// export default {
//     addScrollEvent:function(scrollClassName){
//         document.getElementsByClassName('el-main')[0].addEventListener('scroll', this.handleScroll);
//     },
//     removeScrollEvent:function(scrollClassName){
//         document.getElementsByClassName('el-main')[0].removeEventListener("scroll", this.handleScroll);
//     },
//     handleScroll:function(tableId) {
//         var table = document.getElementById(tableId) 
//         var tableBody =  table.getElementsByClassName('el-table__body-wrapper')[0]; 
//         var tableHeader =  table.getElementsByClassName('el-table__header-wrapper')[0]; 
//         var scrollTop = window.pageYOffset ||document.documentElement.scrollTop ||document.body.scrollTop ||  document.getElementsByClassName('el-main')[0].scrollTop;
//         console.log('tableHeader.offsetHeight',tableHeader.offsetHeight);
//        if (scrollTop >= table.offsetTop) {
//             tableHeader.style.position = 'fixed'
//             tableHeader.style.top = '0'
//             tableHeader.style.zIndex = '100'
//             tableBody.style.marginTop = tableHeader.offsetHeight + 'px'
//         } else {
//             tableHeader.style.position = 'unset'
//             tableBody.style.marginTop = '0'
//         }
//     }
// }

export default class TableStickHeader {

    static tableId = '';
    constructor(tableId){
        TableStickHeader.tableId = tableId;
    }
    addScrollEvent(scrollClassName){
        document.getElementsByClassName(scrollClassName)[0].addEventListener('scroll', this._handleScroll);
    }
    removeScrollEvent(scrollClassName){
        document.getElementsByClassName(scrollClassName)[0].removeEventListener("scroll", this._handleScroll);
    }
    _handleScroll() {
        var table = document.getElementById(TableStickHeader.tableId) 
        var tableBody =  table.getElementsByClassName('el-table__body-wrapper')[0]; 
        var tableHeader =  table.getElementsByClassName('el-table__header-wrapper')[0]; 
        var scrollTop = window.pageYOffset 
        ||document.documentElement.scrollTop 
        ||document.body.scrollTop 
        ||  document.getElementsByClassName('el-main')[0].scrollTop;
        console.log('tableHeader.offsetHeight',tableHeader.offsetHeight);
       if (scrollTop >= table.offsetTop) {
            tableHeader.style.position = 'fixed'
            tableHeader.style.top = '0'
            tableHeader.style.zIndex = '100'
            tableBody.style.marginTop = tableHeader.offsetHeight + 'px'
        } else {
            tableHeader.style.position = 'unset'
            tableBody.style.marginTop = '0'
        }
    }
}