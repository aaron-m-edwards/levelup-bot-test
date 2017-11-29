
module.exports = (controller) => {
  controller.hears(['hello', 'hi'], 'message_received,direct_message', function(bot, message) {
    bot.reply(message, "I'm here!");
  })
}



