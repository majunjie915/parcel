// Native与H5页面交互协议1.2
  import template from "./template-web";

  const serialize = (args) => Object.keys(args).map(item => `${item}=${args[item]}`).join('&');
  const match = navigator.userAgent.match(/auto_(iphone|android);(\d+\.\d+\.\d+);/);
  const appkey = match && match[1];
  const version = match && match[2];

  const schemaShim = (option) => {
    const { schema, iphone, android } = option;

    if (schema && (version >= schema.version || !schema.version)) {
      return schema.method();
    }

    if (appkey === 'iphone' && (version >= iphone.version || !iphone.version)) {
      return iphone.method();
    }

    if (appkey === 'android' && (version >= android.version || !android.version)) {
      return android.method();
    }

    return option.default();
  }

  var schemaMethods = {
    // 跳转WebView页面
    insidebrowser(value) {
      if (!value) { return ''; }
      return `autohome://insidebrowser?url=${encodeURIComponent(value.replace(/\s/g, ''))}`;
    },

    // 视频最终页
    // autohome://article/videodetail?newsid=XX
    // newsid 视频ID
    videoDetail(option) { // option 为对象参数
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://article/videodetail?${args}`;
      } else {
        return option.link;
      }
    },

    // 文章最终页
    // autohome://article/articledetail?newsid=xxx&newstype=xxx
    // newsid 文章id, newstype 文章类型（0普通, 1行情）
    articleDetail(option) {
      option = $.extend({newstype:0},option);
      if (appkey === 'iphone' || appkey === 'android') {
        
        const args = serialize(option);
        return `autohome://article/articledetail?${args}`;
      } else {
        return option.link;
      }
    },

    // 帖子最终页
    // autohome://club/topiclist?bbsid=int&bbstype=string&bbsname=utf8string&sseriesid=XXX
    // bbsid 论坛id, bbstype 论坛类型 , bbsname 论坛名称, seriesid 车系id
    // pageid:最终页的id; bbsid:版块id; bbstype:版块类型, replyCounts: 回复数, title:标题, isask：是否问答贴,pageindex 页码, floor 楼层
    topicDetail(option) {
      const args = serialize(Object.assign({ isask: 0 }, option));
      const _this = this;

      return schemaShim({
        default() { // 浏览器用
          return _this.insidebrowser(`https://m.autohome.com.cn/?${args}.html`);
        },
        schema: { // iphone、android 都用这个
          method() {
            return `autohome://club/topicdetail?${args}`;
          },
        },
      });
    },

    // 车系口碑列表页
    // autohome://reputation/reputationlist?seriesid=xxx&specid=xxx&seriesName=xxx&specname=xxxx	
    // seriesid 车系ID, seriesname 车系名字, specid 车型id, specname 车型名称
    reputationList(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option );
        return `autohome://reputation/reputationlist?${args}`;
      } else {
        return option.link;
      }
    },

    // 口碑最终页
    // autohome://reputation/reputationdetail?seriesid=xxx&specid=xxx&koubeiid=xxx&seriesname={utf8string}
    // seriesid 车系ID, seriesname 车系名字, specid 车型id, koubeiid 口碑id
    reputationDetail(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option );
        return `autohome://reputation/reputationdetail?${args}`;
      } else {
        return option.link;
      }
    },

    // 车系综述页
    // autohome://car/seriesmain?seriesid=XX
    // seriesid 车系ID
    seriesMain(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://car/seriesmain?${args}`;
      } else {
        return option.link;
      }
    },

    // 车型综述页
    // autohome://car/specmain?seriesid=XX&seriesname=XX&specid=XX&specname=XX
    // seriesid 车系ID; seriesname 车系名称; specid 车型ID; specname 车型名称;
    carMain(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://car/specmain?${args}`;
      } else {
        return option.link;
      }
    },

    // 车系/车型图片读图模式
    // autohome://car/caralbum?specid=xxx&seriesid=xxx&pageindex=xxx&piculr=xxx|xxx|xxx&picnum=xxx
    // seriesid 车系ID;specid 车型ID, pageindex 图片位置从0开始;picurl为大图地址url以|间隔, picnum为实际图片总数
    carAlbum(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        option = $.extend({specid:0,pageindex:0},option);
        const args = serialize(option );
        return `autohome://car/caralbum?${args}`;
      } else {
        return option.link;
      }
    },

    // 车型配置页
    // autohome://car/specconfig?seriesid=XX&seriesname=XX&specid=XX&specname=XX
    // seriesid 车系ID; seriesname 车系名称; specid 车型ID; specname 车型名称;
    carConfig(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://car/specconfig?${args}`;
      } else {
        return option.link;
      }
    },

    // 车系经销商列表页
    // autohome://dealer/seriesdealer?seriesid=XX
    // seriesid 车系ID
    dealerList(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://dealer/seriesdealer?${args}`;
      } else {
        return option.link;
      }
    },

    // 经销商地图模式
    // autohome://dealer/dealermap?latitude=xxx&longitude=xxx&dealername=XX
    // latitude:纬度, longitude：经度, dealername：经销商名称
    dealerMap(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://dealer/dealermap?${args}`;
      } else {
        return option.link;
      }
    },

    // 车系经销商的询价页
    // autohome://car/asklowprice?seriesid=xxx&dealerid=xxx&specid=xxx&specname=xxx
    // seriesid 车系ID;specid 车型ID; specname 车型名称;dealerid 经销商ID
    askLowPrice(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://car/asklowprice?${args}`;
      } else {
        return option.link;
      }
    },

    // AR看车主页面
    // autohome://ar/main?seriesid=XX&from=XX&&pvclickurl=XX
    // seriesid 车系ID;from 点击入口来源(可选), pvclickurl 广告位点击上报地址
    arMain(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        const args = serialize(option);
        return `autohome://ar/main?${args}`;
      } else {
        return option.link;
      }
    },

    // 车友圈详情页
    // http://wiki.corpautohome.com/pages/viewpage.action?pageId=82521589
    // autohome://CarFriend/CarFansDetail?isenablechat=1&socialid=xxx
    // isenablechat 默认传1 可以直接从此页面进入聊天页面, socialid 车友圈id
    fansDetail(option) {
      if (appkey === 'iphone' || appkey === 'android') {
        option = $.extend({isenablechat:1},option);
        const args = serialize(option);
        const _this = this;
        
        return schemaShim({
          default() { // 不在版本范围内使用
            return _this.insidebrowser(`https://club.m.autohome.com.cn/cyq/details-${option.socialid}.html`);
          },
          schema: { // iphone、android 都用这个
            version: '8.5.5',
            method() {
              return `autohome://CarFriend/CarFansDetail?${args}`;
            },
          },
        });
      } else {
        return option.link;
      }
    },

    // 车友圈列表页
    // http://wiki.corpautohome.com/pages/viewpage.action?pageId=82531963
    // ios => autohome://CarFriend/CarFansGroupSubList?bbsid=xxx
    // android => autohome://carfriend/relatedcirclelist?clubid=xxx
    // bbsid：论坛id
    fansList(option) {
      const _this = this;
      
      if (appkey === 'iphone' || appkey === 'android') {
        return schemaShim({
          default() {
            return _this.insidebrowser(`https://club.m.autohome.com.cn/cyq/list-c-${option.bbsid}.html`);
          },
          iphone: {
            version: '8.4.5',
            method() {
              return `autohome://CarFriend/CarFansGroupSubList?bbsid=${option.bbsid}`;
            },
          },
          android: {
            version: '8.4.5',
            method() {
              return `autohome://carfriend/relatedcirclelist?clubid=${option.bbsid}`;
            },
          },
        })
      } else {
        return option.link;
      }
    },
  };

  Object.keys(schemaMethods).forEach(function(key){
    template.defaults.imports[key] = schemaMethods[key];
  });


  // 车家号
  template.defaults.imports.chejiahao = function(option) {
    if (appkey === 'iphone' || appkey === 'android') {
      return 'autohome://article/platform?newsid='+option.infoid+'&type='+option.infotype+'&showcommentlist=0&fromsource=&pageindex=&title=';
    } else {
      return option.link;
    }
  }

  // 车商城
  template.defaults.imports.car_mall = function(option){
    if (appkey === 'iphone' || appkey === 'android') {
      return 'autohome://insidebrowser?url=https%3A%2F%2Fm.mall.autohome.com.cn'+(option.coupon_channel === 1 ? ('%2Fitem-' + option.object_id + '-' + 110100) : ((option.source === 5 ? '%2Ffinance' : '') + '%2Fdetail%2F' + option.id + '-' + 110100 + '-0'))+'.html%3Fisapp%3D1';
    } else {
      return option.link;
    }
  }

  // 直播详情页
  template.defaults.imports.live = function(option) {
    if (appkey) {
      return option.live_type === 0 ? 'autohome://liveshow/liveshowdetail?from=search&roomid=' + option.id : ('autohome://article/bulletindetail?newsid=' + option.id + '&articlefromtype=1002&newsstate=' + option.publishStatus);
    } else {
      return schemaMethods.insidebrowser(option.link);
    }
  }

  // 游记
  template.defaults.imports.youji = function(option) {
    if (appkey) {
      return 'autohome://travel/traveldetail?travelid='+option.id;
    } else {
      return option.link;
    }
  }

  export default schemaMethods;
