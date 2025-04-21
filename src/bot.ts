import { Telegraf, Markup, type Context } from "telegraf";
import { message } from "telegraf/filters";
import { keywordResponses } from "./keywords";

const bot = new Telegraf(process.env.BOT_TOKEN!!);

const allCommands = [
  { command: 'help', description: 'Show this help message' },
  { command: 'faq', description: 'Frequently Asked Questions' },
  { command: 'ban', description: 'Ban a user (admin only)' },
  { command: 'shutdown', description: 'Shutdown the bot (admin only)' },
];

bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('Response time: %sms', ms);
})

const isAdmin = async (ctx:Context, next: () => Promise<void>) => {
  try {
    const chatMember = await ctx.getChatMember(ctx.from.id);
    if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
      return next();
    } else {
      ctx.reply('You are not authorized to use this command.');
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    ctx.reply('An error occurred while checking permissions.');
  }
};

bot.telegram.setMyCommands(allCommands);

bot.command('help', (ctx) => {
  let helpText = 'Available commands:\n';
  allCommands.forEach(cmd => {
    helpText += `/${cmd.command} - ${cmd.description}\n`;
  });
  ctx.reply(helpText);
});

bot.command('faq', (ctx) => {
  ctx.reply(`
    Frequently Asked Questions:\n
    1. How can I make deals with Ecoharvest?\n
       - To make a deal, you must first become a registered customer. Once you are signed up, you can make your first deposit. Another approach is to reach out to our customer service at support@ecohavest.org.\n
    2. How can I apply for KYC Verification?\n
       - Once you become a verified customer, you will have access to all of Ecoharvest services. Verify your identity by uploading clear color copies (mobile photo or a scan) of the following documents: Proof of identity – passport, national identity card or driving license (if your identification document also states your correct residential address, then an additional proof of address document may not be required.) Proof of address – bank/card statement or utility bill. Examples of documents which can be provided are: Water/gas/electric/internet/telephone bill. Residency certificate or tenancy contract.
  `);
});

bot.on(message('new_chat_members'), (ctx) => {
  const newcomers = ctx.message.new_chat_members;
  newcomers.forEach((member) => {
    ctx.replyWithHTML(`👋 Welcome, <b>${member.first_name}</b>!`);
    ctx.replyWithHTML(
      `Here’s a quick intro to get started:\n\n` +
      `• Read the <a href="https://ecohavest.org/about">About Us</a>\n` +
      `• Drop a hello in #introductions\n` +
      `• Use /help for commands` +
      `• Use /faq for frequently asked questions`,
      Markup.inlineKeyboard([
        [Markup.button.url('📜 About Us', 'https://ecohavest.org/about')],
        [Markup.button.callback('💬 Introduce Me', 'start_intro')]
      ])
    );
  });
});

bot.on(message('text'), (ctx, next) => {
  const incoming = ctx.message.text.toLowerCase();

  for (const [keyword, { text, extra }] of Object.entries(keywordResponses)) {
    if (incoming.includes(keyword)) {
      // Send a formatted reply with optional buttons
      return ctx.replyWithHTML(text, extra);
    }
  }

  return next();
});

bot.action('start_intro', (ctx) => {
    ctx.answerCbQuery();
    ctx.replyWithHTML(
      `Great! Please tell us a bit about yourself.<i> For example:</i>\n` +
      `“I’m Alex, I love automation and chess!”`
    );
});

bot.start(ctx => ctx.reply("HI from Ecohavest"))

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))