import { Context, Markup, type NarrowedContext } from 'telegraf';
import type { Message, Update } from 'telegraf/typings/core/types/typegram';

let ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Record<"text", {}> & Message.TextMessage>>

export const keywordResponses: Record<string, {
  text: string;
  extra?: Parameters<typeof ctx.replyWithHTML>[1];
}> = {
  kyc: {
    text: `
<b>KYC Verification Guide</b>

1️⃣ Upload a clear photo of your ID (passport, driver’s license)  
2️⃣ Provide proof of address (utility bill, bank statement)  
3️⃣ Allow up to 24 hours for review.
    `,
    extra: Markup.inlineKeyboard([
      [ Markup.button.url('📄 KYC Docs', 'https://ecohavest.org/dashboard/account/kyc') ],
      [ Markup.button.callback('❓ Need Help?', 'kyc_help') ]
    ])
  },
  signup: {
    text: `
<b>How to Sign Up</b>

• Go to ${Markup.button.url('Signup Page','https://ecohavest.org/signup')}  
• Fill in your details and verify your email  
• Start trading instantly!
    `
  },
  // …add more keywords here
};
