const createController = require('./src/controller');
const Botkit = require('Botkit');


function createSlackBot(token) {
  const controller = Botkit.slackbot();
  return {
    controller,
    bot: controller.spawn({token}).startRTM(),
  }
}

function createConsoleBot() {
  const controller = Botkit.consolebot();
  controller.middleware.categorize.use(function(bot, message, next) {
    if (message.type == 'message_received') {
      message.type = 'direct_message';
    }
    next();
  })
  const bot = controller.spawn();
  return {
    controller,
    bot,
  }
}

const slackToken = process.env.SLACK_TOKEN;

const { bot, controller } = slackToken ? createSlackBot(slackToken) : createConsoleBot();

createController(controller);
