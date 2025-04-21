import { Context, Markup } from 'telegraf';
let ctx;
const problemResponse = {
    text: `
    <b>Experiencing an Issue?</b>

    We're sorry to hear you're facing a problem. Please describe the issue you're encountering in detail.

    Alternatively, you can contact our support team directly via email for assistance.
  `,
    extra: Markup.inlineKeyboard([
        [Markup.button.url('📧 Contact Us', 'https://ecohavest.org/contact')]
    ])
};
export const keywordResponses = {
    kyc: {
        text: `
<b>KYC Verification Guide</b>

1️⃣ Upload a clear photo of your ID (passport, driver's license)  
2️⃣ Provide proof of address (utility bill, bank statement)  
3️⃣ Allow up to 24 hours for review.
    `,
        extra: Markup.inlineKeyboard([
            [Markup.button.url('📄 KYC Docs', 'https://ecohavest.org/dashboard/account/kyc')],
            [Markup.button.callback('❓ Need Help?', 'kyc_help')]
        ])
    },
    signup: {
        text: `
<b>How to Sign Up</b>

• Go to ${Markup.button.url('Signup Page', 'https://ecohavest.org/signup')}  
• Fill in your details and verify your email  
• Start trading instantly!
    `
    },
    problem: problemResponse,
    issue: problemResponse,
    issues: problemResponse,
    trouble: problemResponse,
    other: problemResponse
};
