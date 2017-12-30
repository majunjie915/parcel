/**
 * Create by liujin 2017/02/21
 * 通用的小方法
 */
function getQueryString(name) {  // 获取url参数
  'use strict';
  if(location.search) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = decodeURIComponent(location.search.replace(/\+/g, '%20')).split('?')[1].match(reg);
    if (r != null) {
      return r[2];
    }
  }
  return '';
}

export default getQueryString;