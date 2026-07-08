import { LearningStage, LearningTopic, Persona, TopicId } from './types';

export const LEARNING_STAGES: Array<{
  id: LearningStage;
  label: string;
}> = [
  { id: 'theory', label: 'Theory' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'adaptiveQuiz', label: 'Adaptive Quiz' },
  { id: 'result', label: 'Complete' },
];

export const DEFAULT_TOPIC_IDS: TopicId[] = [
  'budgeting',
  'saving-money',
  'emergency-fund',
  'banking',
  'upi-digital-payments',
  'government-schemes',
  'insurance',
  'credit-score',
  'loans',
  'taxes',
  'investing',
  'mutual-funds',
  'stock-market',
  'retirement-planning',
  'fraud-awareness',
  'financial-planning',
];

export const PERSONA_TOPIC_ORDER: Record<Persona, TopicId[]> = {
  Student: [
    'budgeting',
    'saving-money',
    'government-schemes',
    'banking',
    'upi-digital-payments',
    'fraud-awareness',
    'investing',
    'mutual-funds',
    'taxes',
    'insurance',
    'credit-score',
    'loans',
    'emergency-fund',
    'stock-market',
    'retirement-planning',
    'financial-planning',
  ],
  Farmer: [
    'government-schemes',
    'saving-money',
    'insurance',
    'loans',
    'banking',
    'upi-digital-payments',
    'budgeting',
    'fraud-awareness',
    'emergency-fund',
    'investing',
    'mutual-funds',
    'credit-score',
    'taxes',
    'financial-planning',
    'retirement-planning',
    'stock-market',
  ],
  'Salaried Employee': [
    'budgeting',
    'emergency-fund',
    'insurance',
    'investing',
    'taxes',
    'retirement-planning',
    'mutual-funds',
    'credit-score',
    'loans',
    'saving-money',
    'banking',
    'upi-digital-payments',
    'fraud-awareness',
    'stock-market',
    'government-schemes',
    'financial-planning',
  ],
  'Gig Worker': [
    'budgeting',
    'saving-money',
    'emergency-fund',
    'insurance',
    'banking',
    'upi-digital-payments',
    'loans',
    'credit-score',
    'taxes',
    'government-schemes',
    'investing',
    'mutual-funds',
    'fraud-awareness',
    'retirement-planning',
    'financial-planning',
    'stock-market',
  ],
  'Business Owner': [
    'budgeting',
    'banking',
    'upi-digital-payments',
    'taxes',
    'loans',
    'insurance',
    'credit-score',
    'financial-planning',
    'saving-money',
    'emergency-fund',
    'investing',
    'mutual-funds',
    'fraud-awareness',
    'government-schemes',
    'retirement-planning',
    'stock-market',
  ],
  Homemaker: [
    'budgeting',
    'saving-money',
    'banking',
    'upi-digital-payments',
    'emergency-fund',
    'government-schemes',
    'insurance',
    'fraud-awareness',
    'investing',
    'mutual-funds',
    'credit-score',
    'loans',
    'taxes',
    'financial-planning',
    'retirement-planning',
    'stock-market',
  ],
  Retired: [
    'fraud-awareness',
    'banking',
    'upi-digital-payments',
    'insurance',
    'saving-money',
    'government-schemes',
    'financial-planning',
    'taxes',
    'investing',
    'mutual-funds',
    'emergency-fund',
    'budgeting',
    'credit-score',
    'loans',
    'retirement-planning',
    'stock-market',
  ],
  Other: DEFAULT_TOPIC_IDS,
};

function option(
  id: string,
  label: string,
  description: string,
  feedback: string,
  score: number,
  isRecommended: boolean,
  money = score,
  safety = score,
  growth = score
) {
  return {
    id,
    label,
    description,
    feedback,
    isRecommended,
    impact: { score, money, safety, growth },
  };
}

function createPracticalSimulator(id: TopicId, title: string) {
  const defaultOutcomes = [
    {
      minScore: 80,
      title: 'Future-ready decision',
      description:
        'You balanced safety, affordability, and growth. This is the kind of choice future you can build on.',
    },
    {
      minScore: 45,
      title: 'Good start, needs review',
      description:
        'Some choices were practical, but one or two decisions could create pressure later. Review the trade-offs before acting.',
    },
    {
      minScore: 0,
      title: 'Risky decision',
      description:
        'This path may feel convenient today, but it can hurt your cash flow or safety later. Try to spot the hidden cost.',
    },
  ];

  if (id === 'saving-money') {
    return {
      title: 'FD Builder Simulator',
      scenario:
        'You have ₹20,000 saved for a future bike down payment. Build a Fixed Deposit plan without hurting your emergency cash.',
      objective:
        'Choose deposit amount, tenure, and payout style. The goal is safe growth with enough liquidity.',
      decisions: [
        {
          id: 'fd-amount',
          title: 'Choose FD amount',
          prompt: 'How much of your ₹20,000 should go into the FD?',
          options: [
            option('fd-amount-balanced', '₹12,000', 'Keep ₹8,000 liquid for emergencies.', 'Nice balance: your money grows while some cash stays accessible.', 34, true, 24, 34, 28),
            option('fd-amount-all', '₹20,000', 'Put everything into the FD.', 'This grows more, but leaves no quick cash if something urgent happens.', 14, false, 8, -10, 30),
            option('fd-amount-low', '₹3,000', 'Keep most money idle in savings.', 'Very safe, but most of your money misses the chance to earn better interest.', 18, false, 10, 30, 4),
          ],
        },
        {
          id: 'fd-tenure',
          title: 'Choose tenure',
          prompt: 'You may need the bike money in 9-12 months. Which FD tenure fits?',
          options: [
            option('fd-tenure-12', '12 months', 'Matches your likely goal timeline.', 'Good fit: the money matures around when you need it.', 33, true, 24, 30, 28),
            option('fd-tenure-60', '5 years', 'Higher commitment for a long period.', 'Long lock-in can create penalties if you break the FD early.', 10, false, 6, -12, 26),
            option('fd-tenure-1', '1 month', 'Very short FD.', 'Flexible, but frequent renewals may reduce discipline and returns.', 18, false, 10, 20, 8),
          ],
        },
        {
          id: 'fd-payout',
          title: 'Choose interest payout',
          prompt: 'Which payout style helps the goal grow better?',
          options: [
            option('fd-payout-cumulative', 'Cumulative payout', 'Interest is added back and paid at maturity.', 'Great for a goal: compounding helps the FD grow quietly.', 33, true, 20, 28, 34),
            option('fd-payout-monthly', 'Monthly payout', 'Interest comes to your account every month.', 'Useful for income needs, but weaker for growing a goal amount.', 20, false, 18, 24, 8),
            option('fd-payout-ignore', 'Do not check payout type', 'Open whatever is fastest.', 'Skipping terms can lead to surprises later.', 6, false, -4, -8, 2),
          ],
        },
      ],
      outcomes: defaultOutcomes,
    };
  }

  if (id === 'budgeting') {
    return {
      title: 'Monthly Budget Builder',
      scenario:
        'Your monthly income is ₹18,000. Build a budget that covers needs, savings, and wants without running out of money.',
      objective: 'Allocate money like a game board: essentials first, then future goals, then lifestyle.',
      decisions: [
        {
          id: 'budget-needs',
          title: 'Essentials',
          prompt: 'How much should you reserve for rent, food, travel, and bills?',
          options: [
            option('needs-realistic', '₹10,000', 'Covers realistic essentials.', 'Good: essentials are protected before lifestyle spending.', 34, true, 18, 30, 16),
            option('needs-low', '₹5,000', 'Assume essentials will somehow fit.', 'This budget looks good on paper but may collapse mid-month.', 8, false, 10, -16, 6),
            option('needs-high', '₹16,000', 'Keep almost everything for essentials.', 'Safe, but leaves too little for goals and learning discipline.', 18, false, 6, 30, -4),
          ],
        },
        {
          id: 'budget-saving',
          title: 'Savings',
          prompt: 'What amount goes to savings immediately after income arrives?',
          options: [
            option('save-20', '₹3,000', 'Save before spending.', 'Strong move: paying your future self first builds consistency.', 33, true, 20, 24, 30),
            option('save-leftover', 'Whatever remains', 'Spend first, save later.', 'Leftover saving is risky because wants usually expand.', 8, false, -8, 0, 2),
            option('save-zero', '₹0 this month', 'Delay savings.', 'One skipped month can become a habit if there is no plan.', 4, false, -10, -8, -6),
          ],
        },
        {
          id: 'budget-review',
          title: 'Review habit',
          prompt: 'How often should you review this budget?',
          options: [
            option('review-weekly', 'Weekly', 'Quick check every week.', 'Excellent: small corrections prevent month-end panic.', 33, true, 18, 28, 18),
            option('review-never', 'Never', 'Make it once and forget it.', 'Budgets need feedback. Ignoring them makes leaks invisible.', 6, false, -8, -10, -8),
            option('review-yearly', 'Yearly', 'Review once a year.', 'Too slow for daily money habits.', 12, false, 0, 2, 0),
          ],
        },
      ],
      outcomes: defaultOutcomes,
    };
  }

  if (id === 'insurance') {
    return {
      title: 'Insurance Cover Selector',
      scenario:
        'You need protection but have limited monthly cash flow. Choose insurance without overpaying or under-covering.',
      objective: 'Balance premium, cover, exclusions, and real-life risk.',
      decisions: [
        {
          id: 'cover-size',
          title: 'Choose cover',
          prompt: 'Which health cover is the most practical starting point?',
          options: [
            option('cover-balanced', 'Affordable cover with room rent clarity', 'Moderate premium and useful protection.', 'Good: you checked usefulness, not just price.', 34, true, 16, 34, 12),
            option('cover-cheapest', 'Cheapest plan only', 'Lowest premium, many limits.', 'Cheap can become expensive if exclusions block claims.', 8, false, 8, -20, 4),
            option('cover-random', 'Highest cover without checking premium', 'Big cover, painful premium.', 'Protection matters, but unaffordable premiums may lapse.', 16, false, -14, 20, 8),
          ],
        },
        {
          id: 'exclusions',
          title: 'Check exclusions',
          prompt: 'What should you read before buying?',
          options: [
            option('read-waiting', 'Waiting periods and exclusions', 'Check what is not covered yet.', 'Excellent. Claim surprises usually hide in exclusions.', 33, true, 8, 34, 12),
            option('read-logo', 'Only brand logo', 'Trust the company name.', 'Brand matters, but policy wording decides claims.', 8, false, 0, -16, 0),
            option('read-ad', 'Only advertisement benefits', 'Believe the headline.', 'Ads simplify. Policy terms matter.', 10, false, 0, -12, 2),
          ],
        },
        {
          id: 'nominee',
          title: 'Set nominee',
          prompt: 'What do you do after purchase?',
          options: [
            option('nominee-add', 'Add nominee and save documents', 'Make claim process easier.', 'Smart: insurance is useful only if family can claim it.', 33, true, 8, 30, 10),
            option('nominee-later', 'Do it later', 'Postpone documentation.', 'Later often becomes never. This creates friction during emergencies.', 12, false, 0, -8, 0),
            option('nominee-ignore', 'Ignore all documents', 'Just pay premium.', 'Risky. Missing documents can delay support when needed most.', 4, false, -4, -20, -4),
          ],
        },
      ],
      outcomes: defaultOutcomes,
    };
  }

  if (id === 'loans') {
    return {
      title: 'Loan EMI Stress Test',
      scenario:
        'You want to buy a bike. Choose a loan plan that does not crush your monthly life.',
      objective: 'Compare EMI, interest, tenure, and emergency buffer before borrowing.',
      decisions: [
        {
          id: 'emi-size',
          title: 'EMI comfort',
          prompt: 'Which EMI is safer if your income is ₹22,000?',
          options: [
            option('emi-safe', '₹2,500 EMI', 'Leaves room for savings and bills.', 'Good: the EMI fits your life, not just the lender approval.', 34, true, 18, 30, 12),
            option('emi-high', '₹8,000 EMI', 'Finish loan faster but tight cash flow.', 'High EMI can force borrowing again when surprises happen.', 8, false, -20, -16, 8),
            option('emi-unknown', 'Do not calculate EMI', 'Decide after approval.', 'Approval is not affordability. Always calculate first.', 4, false, -10, -12, -4),
          ],
        },
        {
          id: 'interest-check',
          title: 'Interest check',
          prompt: 'What should you compare before signing?',
          options: [
            option('compare-apr', 'Interest rate + processing fee', 'Compare total cost.', 'Correct: fees also affect the real cost of borrowing.', 33, true, 18, 26, 12),
            option('compare-emi-only', 'Only monthly EMI', 'Ignore total interest.', 'Low EMI can hide long tenure and high total interest.', 12, false, 4, -8, 4),
            option('compare-speed', 'Fastest approval only', 'Speed over cost.', 'Fast loans can be costly loans.', 6, false, -10, -12, -4),
          ],
        },
        {
          id: 'buffer',
          title: 'Emergency buffer',
          prompt: 'Before taking the loan, what buffer should remain?',
          options: [
            option('buffer-one-month', 'At least one month expenses', 'A starter safety cushion.', 'Good. A buffer protects EMI payments during surprises.', 33, true, 10, 34, 8),
            option('buffer-zero', 'No buffer', 'Use all cash for down payment.', 'Risky. One emergency can turn EMI into stress.', 4, false, -14, -24, -4),
            option('buffer-credit-card', 'Use credit card if needed', 'Rely on more debt.', 'Debt as emergency backup can snowball quickly.', 6, false, -20, -18, -6),
          ],
        },
      ],
      outcomes: defaultOutcomes,
    };
  }

  if (id === 'mutual-funds' || id === 'investing') {
    return {
      title: id === 'mutual-funds' ? 'SIP Planner Simulator' : 'Investment Choice Simulator',
      scenario:
        'You want long-term growth but also need safety for short-term goals. Choose where the money should go.',
      objective: 'Match investment type with time horizon and risk.',
      decisions: [
        {
          id: 'goal-time',
          title: 'Goal timeline',
          prompt: 'The goal is 6 months away. Where should this money go?',
          options: [
            option('short-safe', 'Savings or FD', 'Low risk for short-term need.', 'Correct: short-term money needs stability.', 34, true, 16, 34, 6),
            option('short-equity', 'Equity fund', 'Possible growth, possible fall.', 'Risky: markets can fall right when you need the money.', 8, false, -16, -18, 20),
            option('short-stock', 'One hot stock', 'High excitement.', 'This is speculation, not planning.', 2, false, -24, -24, 24),
          ],
        },
        {
          id: 'sip-amount',
          title: 'SIP amount',
          prompt: 'For a 5-year goal, what SIP habit is healthiest?',
          options: [
            option('sip-consistent', 'Start ₹1,000 monthly', 'Small and consistent.', 'Great: consistency beats waiting for a perfect amount.', 33, true, 18, 20, 32),
            option('sip-huge', 'Start ₹8,000 and stop if tight', 'Too aggressive.', 'An unaffordable SIP usually breaks quickly.', 12, false, -14, 4, 18),
            option('sip-wait', 'Wait until income doubles', 'Delay investing.', 'Waiting has an opportunity cost.', 8, false, 0, 8, -10),
          ],
        },
        {
          id: 'fund-choice',
          title: 'Fund choice',
          prompt: 'What should you check before choosing a fund?',
          options: [
            option('fund-risk-cost', 'Risk, cost, goal fit', 'Check basics before investing.', 'Good: fund choice should match your timeline and risk.', 33, true, 12, 24, 28),
            option('fund-return-only', 'Only last year return', 'Chase recent winner.', 'Past one-year return can mislead.', 8, false, -8, -10, 10),
            option('fund-friend', 'Friend recommendation only', 'No personal review.', 'Advice helps, but your goal and risk are yours.', 10, false, -4, -6, 6),
          ],
        },
      ],
      outcomes: defaultOutcomes,
    };
  }

  if (id === 'fraud-awareness' || id === 'upi-digital-payments') {
    return {
      title: id === 'fraud-awareness' ? 'Scam Detection Game' : 'UPI Safety Simulator',
      scenario:
        'A message says your account will be blocked unless you click a link and enter UPI PIN.',
      objective: 'Spot red flags before money leaves your account.',
      decisions: [
        {
          id: 'message-action',
          title: 'Suspicious message',
          prompt: 'What do you do first?',
          options: [
            option('ignore-report', 'Do not click, report/block sender', 'Avoid unknown links.', 'Perfect. Unknown links are common fraud traps.', 34, true, 8, 34, 8),
            option('click-check', 'Click to check quickly', 'Open the link.', 'Danger: fake pages can steal credentials.', 2, false, -24, -30, -4),
            option('forward-family', 'Forward to family group', 'Ask others casually.', 'This can spread the scam. Verify from official sources instead.', 10, false, 0, -10, 0),
          ],
        },
        {
          id: 'upi-pin',
          title: 'UPI PIN request',
          prompt: 'When should you enter UPI PIN?',
          options: [
            option('pin-paying', 'Only when I am paying', 'PIN authorizes money leaving.', 'Correct: receiving money never needs your UPI PIN.', 33, true, 4, 34, 6),
            option('pin-receive', 'When receiving money', 'Enter PIN to accept.', 'Nope. This is a classic scam.', 0, false, -30, -34, -6),
            option('pin-support', 'When caller says support needs it', 'Trust caller.', 'Real support will not ask for your PIN.', 2, false, -28, -30, -4),
          ],
        },
        {
          id: 'verify-source',
          title: 'Verification',
          prompt: 'How do you verify account issues?',
          options: [
            option('official-app', 'Open official app/website yourself', 'Do not use message links.', 'Excellent. You controlled the path to the service.', 33, true, 6, 30, 8),
            option('call-number-msg', 'Call number in the message', 'Use sender contact.', 'Scam messages often include scam numbers.', 6, false, -12, -18, -4),
            option('share-otp', 'Share OTP for help', 'Let support verify.', 'OTP sharing can give away account access.', 0, false, -30, -34, -8),
          ],
        },
      ],
      outcomes: defaultOutcomes,
    };
  }

  return {
    title: `${title} Decision Game`,
    scenario: `Practice a real ${title.toLowerCase()} decision where every choice can help or hurt your financial future.`,
    objective:
      'Pick the option that balances today’s need with future safety. There may be trade-offs.',
    decisions: [
      {
        id: `${id}-priority`,
        title: 'Set priority',
        prompt: `What should guide your ${title.toLowerCase()} decision first?`,
        options: [
          option('goal-fit', 'Goal fit and affordability', 'Check if it supports your plan.', 'Strong choice: fit matters more than excitement.', 34, true, 18, 26, 18),
          option('trend', 'What everyone else is doing', 'Follow the crowd.', 'Crowd behavior may not match your income or goals.', 8, false, -6, -8, 4),
          option('speed', 'Fastest option', 'Decide immediately.', 'Speed can hide costs and risks.', 6, false, -8, -8, 0),
        ],
      },
      {
        id: `${id}-risk`,
        title: 'Check risk',
        prompt: 'What risk check should happen before committing?',
        options: [
          option('risk-review', 'Read costs, rules, and downside', 'Review before action.', 'Good: hidden conditions often decide the real outcome.', 33, true, 12, 30, 12),
          option('risk-ignore', 'Ignore small details', 'Assume it is fine.', 'Small details can become expensive later.', 6, false, -12, -16, -4),
          option('risk-delay', 'Delay forever', 'Avoid decision entirely.', 'Avoiding all decisions also has a cost.', 12, false, 0, 12, -8),
        ],
      },
      {
        id: `${id}-follow-up`,
        title: 'Follow up',
        prompt: 'After acting, what should you do next?',
        options: [
          option('track-review', 'Track result and review monthly', 'Keep feedback loop active.', 'Excellent. Review turns action into learning.', 33, true, 14, 24, 18),
          option('forget', 'Forget about it', 'No follow-up.', 'Without review, mistakes stay invisible.', 6, false, -8, -10, -8),
          option('panic-change', 'Change plan every few days', 'React constantly.', 'Too many changes can destroy consistency.', 12, false, -4, -6, 0),
        ],
      },
    ],
    outcomes: defaultOutcomes,
  };
}

function createLessonContent(id: TopicId, title: string) {
  const base = {
    title: `${title} Masterclass`,
    durationMinutes: 5,
    intro: `${title} is not just a definition to memorize. It is a decision skill: you use it when money enters, leaves, grows, or needs protection.`,
    body: `In this lesson, Future You will teach the concept first, then the quiz checks understanding, and the simulator asks you to apply it in a realistic situation.`,
    sections: [
      {
        id: 'why-it-matters',
        heading: 'Why this matters',
        content: `A person who understands ${title.toLowerCase()} can slow down before making a money decision. That pause helps them compare options, avoid hidden costs, and choose what supports their real goals.`,
      },
      {
        id: 'how-it-works',
        heading: 'How it works',
        content: `Start with three questions: What is the goal? When is the money needed? What can go wrong? These three questions turn ${title.toLowerCase()} from theory into a practical decision.`,
      },
      {
        id: 'how-to-use',
        heading: 'How to use it in real life',
        content: `Use this concept before committing money. Write down the amount, time period, risk, and fallback plan. If the decision still feels sensible after that, it is probably healthier.`,
      },
    ],
    keyIdeas: [
      'Every money decision has a trade-off.',
      'Short-term needs need safety; long-term goals can handle more growth risk.',
      'Future you benefits most from decisions you can repeat consistently.',
    ],
    commonMistakes: [
      'Choosing the fastest option without checking terms.',
      'Copying someone else’s decision without checking your own income and goals.',
      'Ignoring small fees, penalties, or risks because they look boring.',
    ],
    note: 'Theory comes first because practical decisions only make sense when the user knows what they are trying to protect or improve.',
    example: `Real-life scenario: you are about to make a ${title.toLowerCase()} decision. Instead of acting instantly, you compare safety, cost, timeline, and goal fit.`,
    quickCheck: {
      prompt: `Before using ${title.toLowerCase()}, what should you know first?`,
      answer: 'Your goal, timeline, available money, and what risk you can handle.',
    },
    simulatorPrep: `In the simulator, you will apply this theory. Your choices can improve or hurt money, safety, and growth.`,
  };

  if (id === 'saving-money') {
    return {
      ...base,
      title: 'Fixed Deposit and Saving Goals',
      intro:
        'Saving is not only keeping money aside. It is matching money with a purpose. A Fixed Deposit can help when you want safety, guaranteed interest, and a clear timeline.',
      sections: [
        {
          id: 'fd-meaning',
          heading: 'What is a Fixed Deposit?',
          content:
            'A Fixed Deposit, or FD, is money kept with a bank for a fixed period. In return, the bank pays a fixed interest rate. It is usually safer than market-linked investments, but the money may be less flexible during the FD period.',
        },
        {
          id: 'fd-when',
          heading: 'When an FD makes sense',
          content:
            'An FD works well for short-term goals where safety matters more than high returns. Examples: bike down payment, college fees, emergency backup, or money needed within 6–24 months.',
        },
        {
          id: 'fd-terms',
          heading: 'Terms you must check',
          content:
            'Check tenure, interest rate, premature withdrawal penalty, payout type, and whether the bank is trustworthy. Cumulative payout helps goals grow because interest stays invested until maturity.',
        },
      ],
      keyIdeas: [
        'FDs are useful for safe, time-bound goals.',
        'Do not lock all cash if you still need emergency money.',
        'Cumulative interest is usually better when saving for a goal.',
      ],
      commonMistakes: [
        'Putting all savings into an FD and keeping no emergency cash.',
        'Choosing a very long tenure for a short-term goal.',
        'Ignoring premature withdrawal penalties.',
      ],
      example:
        'If you have ₹20,000 and need bike money in one year, you might put ₹12,000 in a 12-month cumulative FD and keep ₹8,000 liquid.',
      quickCheck: {
        prompt: 'Why should you avoid putting all your money into an FD?',
        answer:
          'Because emergencies need liquid cash, and breaking an FD early may reduce returns or create penalties.',
      },
      simulatorPrep:
        'Next, you will build an FD plan by choosing amount, tenure, and payout type. Good choices protect liquidity and grow the goal safely.',
    };
  }

  if (id === 'budgeting') {
    return {
      ...base,
      title: 'Budgeting Without Feeling Restricted',
      intro:
        'A budget is not a punishment. It is a plan that tells your money where to go before the month becomes confusing.',
      sections: [
        {
          id: 'budget-purpose',
          heading: 'What a budget really does',
          content:
            'A budget separates needs, savings, and wants. It protects essentials first, pays future you second, and then gives permission to spend what is left.',
        },
        {
          id: 'budget-order',
          heading: 'The correct order',
          content:
            'Start with essential expenses, then savings or goal contribution, then lifestyle spending. If wants come first, savings usually becomes “whatever is left,” and often nothing is left.',
        },
        {
          id: 'budget-review',
          heading: 'Budgets need feedback',
          content:
            'A budget is not perfect on day one. Review it weekly. If food, travel, or subscriptions are leaking money, adjust early instead of panicking at month-end.',
        },
      ],
      keyIdeas: [
        'Essentials first, savings second, wants third.',
        'A weekly review prevents month-end surprises.',
        'A realistic budget beats an impressive fake budget.',
      ],
      commonMistakes: [
        'Planning unrealistically low essentials.',
        'Saving only if money is left later.',
        'Never reviewing actual spending.',
      ],
      example:
        'With ₹18,000 income, you might reserve ₹10,000 for essentials, ₹3,000 for savings, and use the rest carefully for wants and learning.',
      quickCheck: {
        prompt: 'Why is “save whatever is left” weak?',
        answer:
          'Because spending expands easily. Saving first makes the goal non-negotiable.',
      },
      simulatorPrep:
        'Next, you will build a monthly budget. Your choices can make the month stable or stressful.',
    };
  }

  if (id === 'insurance') {
    return {
      ...base,
      title: 'Insurance as Protection, Not Investment',
      intro:
        'Insurance protects you from large financial shocks. It is not bought because something will happen; it is bought because something could happen.',
      sections: [
        {
          id: 'insurance-purpose',
          heading: 'The real purpose',
          content:
            'Insurance transfers big risk to an insurer. Health insurance helps with hospital bills. Life insurance supports dependents. Vehicle insurance protects against accident-related costs.',
        },
        {
          id: 'premium-cover',
          heading: 'Premium versus cover',
          content:
            'The cheapest policy is not always best. A useful policy balances affordable premium, enough cover, fewer harmful limits, and clear claim rules.',
        },
        {
          id: 'exclusions',
          heading: 'Exclusions matter',
          content:
            'Exclusions, waiting periods, room rent limits, and claim rules decide whether insurance actually helps. Always read what is not covered.',
        },
      ],
      keyIdeas: [
        'Insurance is mainly for protection.',
        'Cheap premium can hide weak coverage.',
        'Nominee and documents make claims easier.',
      ],
      commonMistakes: [
        'Buying only because an ad looks good.',
        'Ignoring exclusions and waiting periods.',
        'Not adding nominee details.',
      ],
      example:
        'A moderate health plan with clear room rent rules may be better than the cheapest plan full of limits.',
      quickCheck: {
        prompt: 'What should you read before buying insurance?',
        answer: 'Exclusions, waiting periods, premium, cover amount, and claim rules.',
      },
      simulatorPrep:
        'Next, you will choose an insurance plan. The goal is useful protection without unaffordable premiums.',
    };
  }

  return base;
}

function createTopic(
  id: TopicId,
  title: string,
  icon: string,
  subtitle: string,
  lessonCount: number
): LearningTopic {
  return {
    id,
    title,
    icon,
    subtitle,
    lessonCount,
    lesson: createLessonContent(id, title),
    quiz: [
      {
        id: `${id}-q1`,
        prompt: `What is the best first step when learning ${title.toLowerCase()}?`,
        options: [
          { id: 'a', label: 'Start with a small practical action' },
          { id: 'b', label: 'Wait until you know everything' },
          { id: 'c', label: 'Ignore your current income and goals' },
        ],
        correctOptionId: 'a',
        explanation: 'Small practical actions turn financial knowledge into real behavior.',
      },
      {
        id: `${id}-q2`,
        prompt: 'Which habit helps your future self the most?',
        options: [
          { id: 'a', label: 'Making random money decisions' },
          { id: 'b', label: 'Reviewing choices before spending or borrowing' },
          { id: 'c', label: 'Only learning after a mistake happens' },
        ],
        correctOptionId: 'b',
        explanation: 'Reviewing choices creates awareness, and awareness improves decisions.',
      },
    ],
    adaptiveQuiz: [
      {
        id: `${id}-adaptive-1`,
        prompt: `After practicing ${title.toLowerCase()}, what should you check next?`,
        options: [
          { id: 'a', label: 'Whether the decision fits your goal and cash flow' },
          { id: 'b', label: 'Only whether it looks attractive today' },
          { id: 'c', label: 'Whether someone else is doing it' },
        ],
        correctOptionId: 'a',
        explanation: 'Good financial decisions fit your goals, timeline, and ability to pay.',
      },
    ],
    simulator: createPracticalSimulator(id, title),
  };
}

export const TOPIC_CATALOG: Record<TopicId, LearningTopic> = {
  budgeting: createTopic('budgeting', 'Budgeting', '🧾', 'Plan where your money goes', 3),
  'saving-money': createTopic('saving-money', 'Saving Money', '💰', 'Build your saving habit', 3),
  'emergency-fund': createTopic('emergency-fund', 'Emergency Fund', '🛟', 'Prepare for surprise expenses', 3),
  banking: createTopic('banking', 'Banking', '🏦', 'Use bank accounts confidently', 3),
  'upi-digital-payments': createTopic('upi-digital-payments', 'UPI & Digital Payments', '📱', 'Pay safely and smartly', 3),
  'government-schemes': createTopic('government-schemes', 'Government Schemes', '🏛️', 'Find useful public benefits', 3),
  insurance: createTopic('insurance', 'Insurance', '🛡️', 'Protect against big risks', 3),
  'credit-score': createTopic('credit-score', 'Credit Score', '📊', 'Understand credit health', 3),
  loans: createTopic('loans', 'Loans', '🤝', 'Borrow with confidence', 3),
  taxes: createTopic('taxes', 'Taxes', '🧮', 'Know basic tax decisions', 3),
  investing: createTopic('investing', 'Investing', '📈', 'Grow money over time', 3),
  'mutual-funds': createTopic('mutual-funds', 'Mutual Funds', '🌱', 'Learn SIPs and funds', 3),
  'stock-market': createTopic('stock-market', 'Stock Market', '🏢', 'Understand market basics', 3),
  'retirement-planning': createTopic('retirement-planning', 'Retirement Planning', '🌅', 'Plan for long-term freedom', 3),
  'fraud-awareness': createTopic('fraud-awareness', 'Fraud Awareness', '🚨', 'Spot scams before they hurt', 3),
  'financial-planning': createTopic('financial-planning', 'Financial Planning', '🧭', 'Connect goals into a plan', 3),
};
