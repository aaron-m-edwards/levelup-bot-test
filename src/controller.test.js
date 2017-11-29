const Botmock = require('botkit-mock');
const botController = require('./controller');
const expect = require('chai').expect;

function sendInput(bot, user, text, channel="D") {
  return bot.usersInput([{
    user,
    channel,
    messages: [ { text, isAssertion: true } ]
  }]);
}

describe("bot", () => {
  let bot;
  beforeEach(() => {
    const controller = Botmock({
      disable_startup_messages: true,
      logger: {log: () => {}},
    });
    bot = controller.spawn({type: 'slack'});
    botController(controller);
  });

  it("should repond to hi", function(){
    return sendInput(bot, 'a user', 'hi')
      .then(message => {
        expect(message.text).to.equal('hello there');
      });
  })
  it('should not respond to "boop"', () => {
    return sendInput(bot, 'a user', 'boop')
      .then(message => {
        expect(message).to.be.empty;
      });
  })

  afterEach(() => {
    clearInterval(bot.botkit.tickInterval);
  })
})
