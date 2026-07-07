import { AskAiRequest } from '@/features/ai/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function includesAny(text: string, words: string[]) {
  const normalized = text.toLowerCase();
  return words.some((word) => normalized.includes(word));
}

export async function askFutureSelf({
  question,
  goals = [],
}: AskAiRequest): Promise<string> {
  await delay(1000);

  const normalizedQuestion = question.toLowerCase();
  const primaryGoal = goals[0] || 'your next important goal';

  if (includesAny(normalizedQuestion, ['fd', 'fixed deposit'])) {
    return `A Fixed Deposit lets you invest money for a fixed period and earn guaranteed interest.

Since one of your goals is ${primaryGoal}, an FD could help you safely grow your savings if you do not need immediate access to the money.`;
  }

  if (includesAny(normalizedQuestion, ['sip', 'mutual fund'])) {
    return `A SIP means investing a fixed amount regularly into a mutual fund.

Think of it as a habit-builder for wealth. Start small, stay consistent, and let time do some of the heavy lifting.`;
  }

  if (includesAny(normalizedQuestion, ['bike', 'afford'])) {
    return `Before buying a bike, check three things: down payment, monthly EMI, and running costs like fuel, insurance, and maintenance.

Future you would be happiest if the EMI does not disturb your emergency fund or essential expenses.`;
  }

  if (includesAny(normalizedQuestion, ['emergency'])) {
    return `An emergency fund is money kept aside for unexpected situations like medical needs, job loss, or urgent repairs.

A good first target is one month of expenses. Later, you can grow it to three to six months.`;
  }

  if (includesAny(normalizedQuestion, ['save', 'saving'])) {
    return `Start by saving before spending.

Even if the amount is small, move it aside when income arrives. Future you does not need perfection — just consistency.`;
  }

  if (includesAny(normalizedQuestion, ['loan', 'credit'])) {
    return `Loans can be useful, but only when the repayment fits your monthly life comfortably.

A healthy habit is to compare interest rates, avoid unnecessary borrowing, and pay EMIs on time to protect your credit score.`;
  }

  return `That is a good question.

If I were guiding you from the future, I would ask: will this decision make your money life calmer, safer, or more flexible?

Start with the smallest smart step you can take this week.`;
}