import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '../../../components/ui/Input';
import { useOnboardingStore } from '../onboarding.store';
import type { OnboardingStepHandle } from '../types';

const incomeSchema = z.object({
  income: z.coerce
    .number()
    .positive('Enter an amount greater than zero')
    .max(1_000_000_000, 'Enter a valid amount'),
});

type IncomeForm = z.input<typeof incomeSchema>;

export const IncomeStep = forwardRef<OnboardingStepHandle>(
  function IncomeStep(_, ref) {
    const income = useOnboardingStore((state) => state.income);
    const incomeType = useOnboardingStore(
      (state) => state.incomeType
    );
    const updateData = useOnboardingStore((state) => state.updateData);

    const {
      control,
      trigger,
      getValues,
      formState: { errors },
    } = useForm<IncomeForm>({
      resolver: zodResolver(incomeSchema),
      defaultValues: {
        income: income?.toString() ?? '',
      },
    });

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const valid = await trigger();

        if (valid) {
          updateData(incomeSchema.parse(getValues()));
        }

        return valid;
      },
    }));

    return (
      <Controller
        control={control}
        name="income"
        render={({ field }) => (
          <Input
            label={
              incomeType === 'irregular'
                ? 'Average Weekly Income'
                : 'Monthly Income'
            }
            placeholder="₹ 0"
            keyboardType="number-pad"
            value={String(field.value)}
            onChangeText={(value) =>
              field.onChange(value.replace(/\D/g, ''))
            }
            onBlur={field.onBlur}
            error={errors.income?.message}
          />
        )}
      />
    );
  }
);