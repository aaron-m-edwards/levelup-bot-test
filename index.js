const createBot = require('./bot');
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
  return {
    controller,
    bot: controller.spawn(),
  }
}

const slackToken = process.env.SLACK_TOKEN;

const { bot, controller } = slackToken ? createSlackBot(slackToken) : createConsoleBot();

createBot(controller);
