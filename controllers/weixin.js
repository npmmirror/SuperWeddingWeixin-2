/*!
 * SuperWedding - controllers/weixin.js
 */

'use strict';

/**
 * Module dependencies.
 */
var wechat = require('wechat');
var config = require('../config');

var token = config.weixin.token;

function sendGreeting(res) {
  res.reply([{
    title: '周宁奕&余晓瑞婚礼进行时',
    description: '点击查看详情',
    picurl: 'http://swtest.qiniudn.com/getimgdata.jpeg',
    url: config.serverHost + '/pages/index'
  }]);
}

exports.dispatch = wechat(token)
// When message is a event.
.event(function (message, req, res, next) {
  if (message.Event === 'subscribe') {
    return sendGreeting(res);
  }
  if (message.Event === 'unsubscribe') {
    return res.reply('Bye!');
  }
  res.reply('尚未支持！');
})
// When message is text.
.text(function (message, req, res, next) {
  var content = message.Content;
  if (content === 'ping') {
    return res.reply('pong');
  }
  return sendGreeting(res);
})
.middlewarify();
