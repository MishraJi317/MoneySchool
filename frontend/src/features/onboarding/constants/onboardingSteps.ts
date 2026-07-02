export const ONBOARDING_STEPS = [
  {
    title: 'Meet your future self',
    subtitle: 'A little context today can shape a brighter tomorrow.',
  },
  {
    title: 'Let’s get acquainted',
    subtitle: 'Tell me a little about yourself.',
  },
  {
    title: 'Choose your language',
    subtitle: 'Pick the language you are most comfortable using.',
  },
  {
    title: 'How does money come in?',
    subtitle: 'This helps me make advice fit your real life.',
  },
  {
    title: 'What do you earn?',
    subtitle: 'An estimate is fine. You can update it later.',
  },
  {
    title: 'What do you do?',
    subtitle: 'Choose the option that describes you best.',
  },
  {
    title: 'What are we building toward?',
    subtitle: 'Add the financial goals that matter to you.',
  },
] as const;

export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;