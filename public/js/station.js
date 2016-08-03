moment.locale('zh-tw');
var $pm25 = $('#latest-pm25');
$pm25.attr('class', getDAQIStatus(Number.parseInt($pm25.text())));
$('#latest-status').text(getDAQIStatusText(Number.parseInt($pm25.text())));

$('.concentration-value').each(function() {
  var $this = $(this);
  $this.addClass(getDAQIStatus(Number.parseInt($this.text())));
});

$('select').material_select();
$('.modal-trigger').leanModal();
$('#subscribe').click(function(e) {
  ga('send', 'event', 'data', 'subscribe', 'pm25');
});
$('#subscribe-sensor').click(function(e) {
  ga('send', 'event', 'data', 'submit-subscription', 'pm25');
});
$('#sub-email').on('blur', function() {
  ga('send', 'event', 'sensor-form', 'email-change', 'pm25');
});
$('#sub-name').on('blur', function() {
  ga('send', 'event', 'sensor-form', 'name-change', 'pm25');
});
$('#sub-freq').on('change', function() {
  ga('send', 'event', 'sensor-form', 'freq-change', 'pm25');
});
$('#sub-reason').on('change', function() {
  ga('send', 'event', 'sensor-form', 'reason-change', 'pm25');
});
$('#nearby-stations li a').click(function () {
  ga('send', 'event', 'nearby-stations', 'click', $(this).find('.location').text());
});
$('#state-rank li a').click(function () {
  ga('send', 'event', 'state-rank-stations', 'click', $(this).find('.location').text());
});
$('#country-rank li a').click(function () {
  ga('send', 'event', 'country-rank-stations', 'click', $(this).find('.location').text());
});
$('.marked').click(function() {
  ga('send', 'event', 'pm25-tip', 'click', 'pm2.5 text');
  $('#pm25-modal').openModal();
});
$('.question-mark').click(function() {
  ga('send', 'event', 'pm25-tip', 'click', 'question mark');
  $('#pm25-modal').openModal();
});

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
