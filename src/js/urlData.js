import template from "./template-web";
(function() {
  'use strict';

  function RemoveUrlProtocol(url, isRemoveProtocol) {
    isRemoveProtocol = isRemoveProtocol == undefined ? true : isRemoveProtocol
    if (isRemoveProtocol) {
        url = url.replace("http://", "//").replace("https://", "//").replace("/Blog/", "/blog/");
    }
    return url;
  }

  function UpdateImgToOriginalPathCar(pArray, size) {
    var picName = pArray[pArray.length - 1];
    if (picName.indexOf("autohomecar__") > -1) {
        picName = picName.substring(picName.lastIndexOf("autohomecar__"));
    }
    else if (pArray[2] == "m0.autoimg.cn") {
        var n = picName.indexOf("_");
        if (n > -1 && n <= 2) {
            picName = picName.substring(picName.indexOf("_") + 1);
        }
        picName = "autohomecar__" + picName;
    }
    //---http://car0.autoimg.cn/selected/20120830/220/5322531178116739662.jpg
    //http://m0.autoimg.cn/cardfs/selected/20120830/original/5322531178116739662.jpg

    if (pArray[3].indexOf("selected") > -1 || pArray[4].indexOf("selected") > -1) {
        picName = picName.replace("y_", "");
        pArray[5] = "original";
    }
    picName = picName.replace(/\d+x\d+_\d_(q\d+_)?(c\d+_)?/ig, '');
    pArray[pArray.length - 1] = size + picName;
    return RemoveUrlProtocol(pArray.join('/')).replace("/carnews/", "/upload/");
  }

  function UpdateImgToOriginalPathNews(pArray, size) {
    var picName = pArray[pArray.length - 1];
    if (picName.indexOf("autohomecar__") > -1)
    {
      picName = picName.substring(picName.lastIndexOf("autohomecar__"));
      //http://img2.autoimg.cn/soudfs/g11/M0E/7A/20/wKgH4VgE_miAbq_OAATtcv4tZCk253.jpg
    }
    else if (pArray[3] == "soudfs" || pArray[2] == "img2.autoimg.cn")
    {
      picName = "autohomecar__" + picName;
    }
    else if (picName.indexOf("x_") == 0 && pArray[3].indexOf("newsdfs/2") == 0) //处理 文字400x300代表图
    {
      picName = "autohomecar__" + picName;
    }
    else if (pArray.length > 4 && (picName.indexOf("z_") == 0 || picName.indexOf("x_") == 0) && (pArray[4] == "wwwimgpic" || pArray[4] == "wwwimg")) //处理文字代表图
    {
      if (pArray[3].indexOf("video") > -1 && picName.indexOf("z_") == 0)
      {
        picName = "autohomecar__x_" + picName.substring(picName.indexOf("z_") + 2);// 替换z_ 为y_
      }
      else if (pArray[3].indexOf("video") > -1 && picName.indexOf("x_") == 0)
      {
        picName = "autohomecar__x_" + picName.substring(picName.indexOf("x_") + 2);// 替换z_ 为y_
      }
      else
      {
        picName = "autohomecar__" + picName.substring(picName.indexOf("z_") + 2);
      }
    }
    else
    {
      picName = "autohomecar__" + picName.substring(picName.lastIndexOf("_") + 1); // 不存在的时候 (-1+1=0); 删去标示图片大小的前缀
    }
    pArray[pArray.length - 1] = size + picName;
    return RemoveUrlProtocol(pArray.join('/'));
  }

  function ConvartImage(img, size) {
    if (img == undefined || img === "" || img.indexOf('//') == -1) {
        return "";
    }
    var pArray = img.split('/');
    var picName = pArray[pArray.length - 1];
    var domain = pArray[2];
    var obusiness = pArray[3];

    //cardfs 产品库
    //newsdfs 资讯
    var business = "";
    switch (domain)
    {
        case "car0.autoimg.cn":
        case "car1.autoimg.cn":
        case "car0.m.autoimg.cn":
        case "car1.m.autoimg.cn":
            business = "cardfs";
            break;
        case "www.autoimg.cn":
        case "www0.autoimg.cn":
        case "www1.autoimg.cn":
        case "www0.m.autoimg.cn":
        case "www1.m.autoimg.cn":
        case "www3.autoimg.cn":
        case "www2.autoimg.cn":
            business = "newsdfs";
            break;
        case "m0.autoimg.cn":
        case "m1.autoimg.cn":
            break;
        default://这样支持 多种域名。//http://k3.autoimg.cn/koubeidfs/g12/M07/F3/14/400x225_autohomecar__wKgH01lfLPKAQMVmAAxg9nV8pJE092.jpg
            pArray[2] = "m1.autoimg.cn";
    }
    if (business != "" && business != obusiness) {
        pArray[2] = "m0.autoimg.cn";
        pArray[3] = business + "/" + pArray[3];
    }

    if (business == "cardfs" || obusiness == "cardfs") {
        return UpdateImgToOriginalPathCar(pArray, size);
    }

    return UpdateImgToOriginalPathNews(pArray, size);
  }

  template.defaults.imports.ConvartImage = ConvartImage;

})();