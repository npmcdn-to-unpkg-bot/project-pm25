$('select').material_select();
$('.modal-trigger').leanModal();


var REFRESH = 60 * 10 * 1000;
var ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getDAQIStatus(index) {
  if (!isNumeric(index) || index < 0) {
    return 'invalid';
  } else if (index <= 35) {
    return 'low';
  } else if (index <= 53) {
    return 'moderate';
  } else if (index <= 70) {
    return 'high';
  } else {
    return 'extreme';
  }
}

function getDAQIStatusText(index) {
  if (!isNumeric(index) || index < 0) {
    return '資料錯誤';
  } else if (index <= 35) {
    return '空氣品質指標良好，可以正常戶外活動。';
  } else if (index <= 53) {
    return '空氣品質指標適中，有心臟、呼吸道及心血管疾病的成人與孩童應考慮減少戶外活動。';
  } else if (index <= 70) {
    return '空氣品質指標危險，任何人如果有不適，如眼痛，咳嗽或喉嚨痛等，應該考慮減少戶外活動。';
  } else {
    return '空氣品質指標高危險，任何人如果有不適，如眼痛，咳嗽或喉嚨痛等，應減少體力消耗，特別是減少戶外活動。';
  }
}

if (typeof did !== 'undefined' && did != '') {
  var api = 'http://nrl.iis.sinica.edu.tw/LASS/history-hourly.php?device_id=' + did;
  $.get(api, function (data) {
    var feeds = $.parseJSON(data)['feeds'];
    var latest = feeds[feeds.length - 1];
    var pm25 = latest['PM2_5'];
    $('#latest-pm25').text(parseInt(pm25)).attr('class', getDAQIStatus(pm25));
    moment.locale('zh-tw');
    $('#latest-status').text(getDAQIStatusText(pm25));
    $('#latest-time').text(moment(latest['timestamp'], ISO_FORMAT).fromNow());
    moment.locale('en');
  });
} else {
  //No device id
}
