const Botmock = require('botkit-mock');
const botController = require('./controller');
const expect = require('chai').expect; //mochat test global require

//Extract these to 'helper' functions
function sendInput(bot, user, text, channel="D") {
  return bot.usersInput([{
    user,
    channel,
    messages: [ { text, isAssertion: true } ]
  }]);
}

function createMockBot(controller) {
  const mockController = Botmock({
      disable_startup_messages: true,
      logger: {log: () => {}},
  })
  const bot = mockController.spawn({type: 'slack'});
  controller(mockController);
  return bot;
}

function shutdownBot(bot) {
  bot.botkit.tickInterval && clearInterval(bot.botkit.tickInterval);
}

describe("bot", () => {
  let bot;
  beforeEach(() => {
    bot = createMockBot(botController);
  });

  it("should repond to hi", function(){
    return sendInput(bot, 'test', 'hi')
      .then(message => {
        expect(message.text).to.equal('Hello test');
      });
  })
  it('should not respond to "boop"', () => {
    return sendInput(bot, 'test', 'boop')
      .then(message => {
        expect(message).to.be.empty;
      });
  })

  afterEach(() => {
    clearInterval(bot.botkit.tickInterval);
  })
})
