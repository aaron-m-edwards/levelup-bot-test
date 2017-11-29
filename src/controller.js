module.exports = (controller) => {
  controller.hears(['hi'], 'direct_message', function (bot, message) {
     bot.api.users.info({user: message.user}, (error, response) => {
       bot.reply(message, `Hello ${response.user.name}`);
    });
  });
}



