
module.exports = (controller) => {

  controller.on('message_received', function(bot, message) {
    bot.reply(message, 'I heard... something!');
  });

  controller.on('direct_message',function(bot,message) {
    bot.reply(message,'You are talking directly to me');
  });
}



