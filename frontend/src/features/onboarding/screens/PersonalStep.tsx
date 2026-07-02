import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

import { Input } from '../../../components/ui/Input';
import { useOnboardingStore } from '../onboarding.store';
import type { OnboardingStepHandle } from '../types';

const personalSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  age: z.coerce
    .number()
    .int()
    .min(13, 'You must be at least 13')
    .max(120, 'Enter a valid age'),
});

type PersonalForm = z.input<typeof personalSchema>;

export const PersonalStep = forwardRef<OnboardingStepHandle>(
  function PersonalStep(_, ref) {
    const name = useOnboardingStore((state) => state.name);
    const age = useOnboardingStore((state) => state.age);
    const updateData = useOnboardingStore((state) => state.updateData);

    const {
      control,
      trigger,
      getValues,
      formState: { errors },
    } = useForm<PersonalForm>({
      resolver: zodResolver(personalSchema),
      defaultValues: {
        name,
        age: age?.toString() ?? '',
      },
    });

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const valid = await trigger();

        if (valid) {
          updateData(personalSchema.parse(getValues()));
        }

        return valid;
      },
    }));

    return (
      <View className="gap-5">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              label="Name"
              placeholder="Your name"
              autoCapitalize="words"
              value={String(field.value)}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="age"
          render={({ field }) => (
            <Input
              label="Age"
              placeholder="Your age"
              keyboardType="number-pad"
              maxLength={3}
              value={String(field.value)}
              onChangeText={(value) =>
                field.onChange(value.replace(/\D/g, ''))
              }
              onBlur={field.onBlur}
              error={errors.age?.message}
            />
          )}
        />
      </View>
    );
  }
);