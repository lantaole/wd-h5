/**
 * Created by ycb on 2017/7/18.
 */
import store from "@/store";
import wx from "weixin-jsapi";
import api from "api";

/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (content) {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
};

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储sessionStorage
 */
export const setSessionStorage = (name, content) => {
  if (!name) return;
  if (content) {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getSessionStorage = name => {
  if (!name) return;
  return JSON.parse(window.sessionStorage.getItem(name));
};

/**
 * 删除sessionStorage
 */
export const removeSessionStorage = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * 深度copy（数组，对象）
 * obj 要复制的原数据
 * child 返回的数据类型（默认object）
 */
export const extendDeep = (obj, child) => {
  let i, proxy;
  proxy = JSON.stringify(obj);
  proxy = JSON.parse(proxy);
  child = child || {};
  for (i in proxy) {
    if (proxy.hasOwnProperty(i)) {
      child[i] = proxy[i];
    }
  }
  proxy = null;
  return child;
};

/**
 * 实时获取服务端时间
 */
export const getSeverTime = () => {
  return store.state.severTime + new Date().getTime() - store.state.clientTime;
};

/**
 * 解析url地址参数
 */
export const getUrlParams = (url, name) => {
  if (!url || !name) {
    return;
  }
  const reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
  const r = url.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 平滑滚动到顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/**
 * 函数节流
 */
export const throttle = (fn, time) => {
  let _self = fn;
  let timer = null;
  let firstTime = true;

  return function() {
    let args = arguments;
    let self = this;
    if (firstTime) {
      _self.apply(self, args);
      return (firstTime = false);
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      _self.apply(self, args);
    }, time || 500);
  };
};

/**
 * 淘宝图片缩小
 */
export const zoomOutTaobaoImg = (img, size) => {
  let fileExt = img.replace(/.+\./, "").toLowerCase();
  return img + size + fileExt;
};

/**
 * 验证邮箱
 */
export const ischeckemail = email => {
  const reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//eslint-disable-line
  return reg.test(email);
};

/* 时间格式化，同过滤器*/
export const dateFormatUtil = (timeSpan, format) => {
  if (!timeSpan) return;
  let date = new Date(timeSpan);
  let o = {
    "M+": date.getMonth() + 1, //月
    "D+": date.getDate(), //天
    W: "日一二三四五六".charAt(date.getDay()), //星期
    "h+": date.getHours(), //时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季节
    S: date.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};

// UTC时间转化为本地时区时间
export const convertUTCTimeToLocalTime = UTCDateString => {
  if (!UTCDateString) {
    return "-";
  }
  function formatFunc(str) {
    //格式化显示
    return str > 9 ? str : "0" + str;
  }
  var date2 = new Date(UTCDateString); //这步是关键
  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var hour = formatFunc(date2.getHours());
  var min = formatFunc(date2.getMinutes());
  var sec = formatFunc(date2.getSeconds());
  var dateStr =
    year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
  return dateStr;
};

/**
 * 生成当前时间的年月日
 */
export const timeToDate = () => {
  var date = new Date();
  return dateFormatUtil(date, "YYYY-MM-DD");
};

/**
 * 生成上个月今天的年月日
 */
export const timeLastMonthToDate = () => {
  var date = new Date();
  var timestamp = date.valueOf() - 1000 * 60 * 60 * 24 * 30;
  return dateFormatUtil(timestamp, "YYYY-MM-DD");
};

/**
 * 生成当前时间 + 随机20位字符串（字母+ 数字）
 */
export const randomString = () => {
  return `${timeToDate()}/${Math.random()
    .toString(36)
    .substr(2)}${parseInt(
    new Date().getTime() / parseInt(Math.random() * 1000 - 100 + 100)
  )}`;
};

/**
 * 删除指定DOM标签
 */
export const removeScript = element => {
  document.body.removeChild(element);
};

/**
 * 动态生成JS标签
 */
export const loadRemoteJs = src => {
  var scriptElement = document.createElement("script");
  document.body.appendChild(scriptElement);
  scriptElement.addEventListener(
    "load",
    () => {
      removeScript(scriptElement);
    },
    false
  );
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.src = src;
};

/**
 * 电话号码加密
 */
export const phoneEncryption = (phone, first, second) => {
  if (!phone) return;
  return `${phone.substr(0, first || 3)}****${phone.substr(second || 7)}`;
};

/**
 * 计算商品折扣比例
 */
export const getStock = (newPrice, oldPrice) => {
  if (newPrice == null || oldPrice == null || newPrice >= oldPrice) {
    return "0.00";
  }
  return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(2) + "%";
};

/**
 * 判断是否ios 1:ios 2:安卓 3：pc
 */

export const judgeBrowerType = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // g
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    // 这个是安卓操作系统
    return 2;
  }
  if (isIOS) {
    // 这个是ios操作系统
    return 1;
  }
  return 3;
};

export const coppyArray = arr => {
  return arr.map(e => {
    if (typeof e === "object") {
      return Object.assign({}, e);
    } else {
      return e;
    }
  });
};

/*获取网址参数*/
export const getUrlParameter = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURI(window.location.search)
    .substr(1)
    .match(reg);
  if (r != null) return r[2];
  return null;
};

// 保存图片到本地
export const downloadIamge = (imgsrc, name) => {
  var alink = document.createElement("a");
  alink.href = imgsrc;
  alink.download = name; //图片名
  alink.click();
};

// 判断是否为微信环境
export const isWechat = () => {
  var ua = navigator.userAgent.toLowerCase();
  // 判断是否为微信环境
  return ua.match(/MicroMessenger/i) == "micromessenger";
};

// 微信授权
export const wechatAuthorization = (redirect_url, state) => {
  let State = state || "";
  let RedirectUrl = encodeURIComponent(redirect_url); //window.location.href
  const app_id = "wxd634eb8ca1ab9581";
  window.location.href =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    app_id +
    "&redirect_uri=" +
    RedirectUrl +
    "&state=" +
    State +
    "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
};

//微信支付方法（点击按键调用）
/*
微信支付方法
获取微信加签信息
@param{data}:获取的微信加签
@param{cb}:成功回调
*/
export const wexinPay = (data, cb, errorCb) => {
  let appId = data.appId;
  let timestamp = data.timeStamp;
  let nonceStr = data.nonceStr;
  let signature = data.signature;
  let packages = data.prepayId;
  let paySign = data.paySign;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(function() {
    wx.chooseWXPay({
      timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
      package: "prepay_id=" + packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paySign, // 支付签名
      success: function(res) {
        // 支付成功后的回调函数
        cb(res);
      },
      fail: function(res) {
        // 支付失败后的回调函数
        errorCb(res);
      }
    });
  });
  wx.error(function(res) {
    console.log(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    /*alert("config信息验证失败");*/
  });
};

/**
 * 微信签名参数url参数处理
 */
export const getWxConfigParams = shareParams => {
  // window.__wxjs_is_wkwebview
  // true 时 为 IOS 设备
  // false时 为 安卓 设备
  var urlParams = {
    url: window.location.href
  };
  if (window.__wxjs_is_wkwebview) {
    // IOS
    let url = window.entryUrl || window.location.origin + "/";
    urlParams.url = url;
    wxConfig(urlParams, shareParams);
  } else {
    // 安卓
    setTimeout(function() {
      wxConfig(urlParams, shareParams);
    }, 500);
  }
};

/**
 * 微信签名+分享
 */
export const wxConfig = (urlParams, shareParams) => {
  // console.log("url:" + urlParams.url);
  // console.log("shareParams:", shareParams);
  api.getWxConfig(urlParams).then(
    share_res => {
      wx.config({
        debug: false,
        appId: share_res.appId,
        timestamp: share_res.timestamp,
        nonceStr: share_res.nonceStr,
        signature: share_res.signature,
        jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
      });

      wx.ready(function(res) {
        console.log("readyyy", res);
        wx.checkJsApi({
          jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
        });
        // 分享朋友
        wx.onMenuShareAppMessage({
          title: shareParams.title, // 分享标题
          desc: shareParams.desc, // 分享描述
          link: shareParams.link, // 分享链接
          imgUrl: shareParams.imgUrl, // 分享图标
          type: "", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function(res1) {
            console.log(1, res1);
            // alert("点击分享朋友");
          },
          cancel: function(res1) {
            console.log(1, res1);
            // alert("取消分享朋友");
          }
        });
        // 分享朋友圈
        wx.onMenuShareTimeline({
          title: shareParams.title, // 分享标题
          link: shareParams.link, // 分享链接
          imgUrl: shareParams.imgUrl, // 分享图标
          success: function(res1) {
            console.log(2, res1);
            // alert("点击分享朋友圈");
          },
          cancel: function(res1) {
            console.log(2, res1);
            // alert("取消分享朋友圈");
          }
        });
      });
      wx.error(err => {
        console.log(err);
      });
    },
    function(name, error) {
      console.log("errrr:", name, error);
    }
  );
};

// 获取微信客服导师二维码和微信号
export const getWechatImg = type => {
  const wechatImgData = {
    teacher: [
      {
        wechatImg:
          process.env.BASE_URL +
          "/images/common/wechat-img/wechat-img-teacher1.jpg",
        wechatCode: "aaa1021aa"
      }
    ],
    service: [
      {
        wechatImg:
          process.env.BASE_URL +
          "/images/common/wechat-img/wechat-img-teacher1.jpg",
        wechatCode: "aaa1021aa"
      }
    ]
  };
  if (type === "service") {
    return wechatImgData.service[0];
  } else if (type === "teacher") {
    return wechatImgData.teacher[
      dateFormatUtil(new Date(), "D") % wechatImgData.teacher.length
    ];
  }
};

export const getCurrentWeek = week => {
  const weekList = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  return weekList[week];
};

export const getCurrentMonthEnglish = month => {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return monthList[month];
};

/**
 * 验证是否是非0正整数
 */
export const isInteger = number => {
  const IS_INTEGER = /^\+?[1-9][0-9]*$/;
  return IS_INTEGER.test(number);
};
