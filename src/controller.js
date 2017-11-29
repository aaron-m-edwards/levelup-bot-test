module.exports = (controller) => {
  controller.hears(['hi'], 'direct_message', function (bot, message) {
    bot.reply(message, 'hello there');
  });
}



