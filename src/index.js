import classes from './css/search-index-cock.css';

import template from "./js/template-web";
import schema from "./js/schema";
import urlData from "./js/urlData";
import minFn from "./js/minFn";

$(function() {
  'use strict';

  var data = {};
  var listing = [
    {
      type: 'topic',
      data: {
        id: 53664250,
        title: '我与H7的故事（7月15日增加另一非精华帖子的链接）',
        desc: '[汽车之家 新车上市]今日，庆铃汽车TAGA皮卡正式上市，这是庆铃汽车作为自主品牌推出的首款产品',
        type: '帖子',
        comment: 28,
        text: '傲虎论坛',
      }
    },
    {
      type: 'onlyArticle',
      data: {
        id: 909658,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        desc: '[汽车之家 新车上市]今日，庆铃汽车TAGA皮卡正式上市，这是庆铃汽车作为自主品牌推出的首款产品',
        type: '文章',
        comment: 28,
        text: '游记频道',
        articlefromtype: 1002
      }
    },
    {
      type: 'picArticle',
      data: {
        id: 909658,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        type: '文章',
        comment: 28,
        text: '游记频道',
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg',
        articlefromtype: 1002
      }
    },
    {
      type: 'chejiahao',
      data: {
        id: 1578531,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        type: '车家号',
        comment: 28,
        text: '车里有读',
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg',
        infotype: 1
      }
    },
    {
      type: 'video',
      data: {
        id: 171181,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        type: '视频',
        playNum: 28,
        long: '09:19',
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg'
      }
    },
    {
      type: '1111',
      data: {
        id: 123,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        type: '双11',
        playNum: 28,
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg'
      }
    },
    {
      type: 'car_mall',
      data: {
        id: 433003,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        type: '车商城',
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg',
        price: '10.99万',
        deduction: '1.99',
        text: '已有90条购买记录'
      }
    },
    {
      type: 'second_hand_car',
      data: {
        id: 123,
        title: '本月上市 吉利新帝豪EC7正式更名新帝豪',
        type: '二手车',
        picUrl: '//s.autoimg.cn/mass/v2/img/nullimg-43.png',
        price: '10.99万',
        mileage: '2万公里',
        years: '2017年'
      }
    },
    {
      type: 'reputation',
      data: {
        id: 123,
        title: '同价位您会选择讴歌CDX还是本田冠道',
        type: '口碑',
        score: '4.21',
        rank: '437',
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg',
        text: '2.8万人参与'
      }
    },
    {
      type: 'live',
      data: {
        id: 33513,
        title: '同价位您会选择讴歌CDX还是本田冠道',
        type: '直播回顾',
        brief: '吕由',
        joinNum: '69.3',
        picUrl: '//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg',
        comment: '28',
        live_type: 0,
        publishStatus: 2
      }
    },
    {
      type: 'display',
      data: {
        id: 123,
        title: '同价位您会选择讴歌CDX还是本田冠道',
        type: '广州车展',
        picUrl: 'images/690x388.png',
        comment: '28'
      }
    },
    {
      type: 'youji',
      data: {
        id: 123,
        title: '同价位您会选择讴歌CDX还是本田冠道',
        type: '游记',
        picUrl: ['//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg','//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg','//www3.autoimg.cn/newsdfs/g22/M04/A9/E4/400x300_0_autohomecar__wKgFW1oOh8-AUQ62AAF578iSkxg158.jpg'],
        view: '8.3',
        comment: 28
      }
    }
  ];

  data.listing = listing;
  data.activity = [
    {dataEntry: 84, q: '圣诞', fromType: 2, tag: '热卖', title: '解锁圣诞礼遇季'}, {dataEntry: 58, q: '圣诞', fromType: 2, tag: '热卖', title: '解锁圣诞礼遇季'}, {dataEntry: 117, q: '圣诞', fromType: 2, title: '解锁圣诞礼遇季'}, {dataEntry: 57, q: '领克01最新消息', fromType: 4, title: '解锁圣诞礼遇季'}
  ];
  data.tabItems = [
    {name: '广州车展'},{name:'宝马X5'},{name:'双11活动'},{name:'奥迪A6L'},{name:'奥迪A6L'}
  ];
  data.othersSearch = [
    {id: 111, name: '宝马x6'}, {id: 222, name: '宝马x6'}, {id: 333, name: '宝马x6'}, {id: 444, name: '宝马x6'}
  ];

  var html = template("activityTemp",data);
  $("#activity").append(html);

  var html = template("anchorTemp",data);
  $(".tab-scroll .anchor").append(html);

  var html = template("listingTemp",data);
  $("#listing").append(html);

  var html = template("othersSearchTemp",data);
  $("#othersSearch").append(html);

  // 跳转到搜索中间页
  $("#searchCol").click(function(e){
    if(e.target.className=="channel"){
      location.href = "searchOperating.html?isOpen=true";
    }else{
      location.href = "searchOperating.html";
    }
  })


  // 切换 tab 更新数据
  $(document).on('click', '.tab-scroll .anchor span', function() {
    console.log($(this).text());
  });


  (function sticky(){
    var aim = $('.search-index-brief .trigger');
    $(window).on('scroll', function(){
      var coords = aim.offset().top;
      var scrollTop = $(window).scrollTop();
      if (scrollTop > coords){
        aim.addClass('sticky');
      }else{
        aim.removeClass('sticky');
      }
    })
  })();
});