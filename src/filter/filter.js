/**
 * 格式化时间
 * timeSpan：要格式化的时间（毫秒数）
 * format：要格式化的时间格式（YYYY-MM-DD hh:mm:ss）
 */
const dateFormat = (timeSpan, format) => {
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

/// 处理网络图片hack
const networkImageHack = (imagePath, aliOssHack) => {
  if (imagePath.indexOf("aliyuncs.com") != -1) {
    return `${imagePath}!thum${aliOssHack}`;
  } else if (imagePath.indexOf("img.alicdn.com") != -1) {
    return `${imagePath}_${aliOssHack}x${aliOssHack}.jpg_.webp`;
  } else {
    return imagePath;
  }
};

/*根据当前语言环境取后端name字段，name: 泰文; nameUs: 英文; nameLocal: 中文;*/
const localeName = (obj, locale) => {
  if (!obj) return;
  let localeName;
  switch (locale) {
    case "en":
      localeName = obj.nameUs;
      break;
    case "th":
      localeName = obj.name;
      break;
    default:
      localeName = obj.name;
  }
  return localeName;
};

export { dateFormat, localeName, networkImageHack };
