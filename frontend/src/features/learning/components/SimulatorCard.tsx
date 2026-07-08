import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SimulatorContent } from '../types';

interface SimulatorCardProps {
  simulator: SimulatorContent;
  selectedOptionIds: Record<string, string>;
  onSelectOption: (decisionId: string, optionId: string) => void;
  onComplete: (resultId: string) => void;
}

export function SimulatorCard({
  simulator,
  selectedOptionIds,
  onSelectOption,
  onComplete,
}: SimulatorCardProps) {
  const [decisionIndex, setDecisionIndex] = useState(0);

  const currentDecision = simulator.decisions[decisionIndex];
  const selectedOptionId = selectedOptionIds[currentDecision.id] ?? null;
  const selectedOption = currentDecision.options.find(
    (option) => option.id === selectedOptionId
  );
  const isLastDecision = decisionIndex === simulator.decisions.length - 1;

  const score = useMemo(() => {
    return simulator.decisions.reduce((total, decision) => {
      const optionId = selectedOptionIds[decision.id];
      const option = decision.options.find((item) => item.id === optionId);

      return total + (option?.impact.score ?? 0);
    }, 0);
  }, [selectedOptionIds, simulator.decisions]);

  const metrics = useMemo(() => {
    return simulator.decisions.reduce(
      (total, decision) => {
        const optionId = selectedOptionIds[decision.id];
        const option = decision.options.find((item) => item.id === optionId);

        return {
          money: total.money + (option?.impact.money ?? 0),
          safety: total.safety + (option?.impact.safety ?? 0),
          growth: total.growth + (option?.impact.growth ?? 0),
        };
      },
      { money: 0, safety: 0, growth: 0 }
    );
  }, [selectedOptionIds, simulator.decisions]);

  const normalizedScore = Math.max(0, Math.min(100, score));
  const outcome = [...simulator.outcomes]
    .sort((a, b) => b.minScore - a.minScore)
    .find((item) => normalizedScore >= item.minScore);

  const goNext = () => {
    if (!selectedOptionId) return;

    if (!isLastDecision) {
      setDecisionIndex((value) => value + 1);
      return;
    }

    onComplete(`${normalizedScore}-${outcome?.title ?? 'Simulator Result'}`);
  };

  return (
    <Card variant="elevated" className="mb-5">
      <Text className="text-xl font-bold text-gray-900">{simulator.title}</Text>
      <Text className="mt-3 text-base leading-7 text-gray-600">
        {simulator.scenario}
      </Text>

      <View className="my-5 rounded-2xl bg-violet-50 p-4">
        <Text className="text-4xl">🧪</Text>
        <Text className="mt-2 text-sm font-bold text-violet-800">
          Game Objective
        </Text>
        <Text className="mt-1 text-sm leading-6 text-violet-900">
          {simulator.objective}
        </Text>
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Decision {decisionIndex + 1} of {simulator.decisions.length}
        </Text>

        <Text className="text-sm font-bold text-emerald-600">
          Practical score {normalizedScore}
        </Text>
      </View>

      <View className="mb-4 rounded-2xl bg-gray-50 p-4">
        <Text className="text-base font-bold text-gray-900">
          {currentDecision.title}
        </Text>
        <Text className="mt-2 text-sm leading-6 text-gray-600">
          {currentDecision.prompt}
        </Text>
      </View>

      <View className="gap-3">
        {currentDecision.options.map((option) => (
          <Button
            key={option.id}
            label={option.label}
            variant={selectedOptionId === option.id ? 'primary' : 'outline'}
            onPress={() => onSelectOption(currentDecision.id, option.id)}
          />
        ))}
      </View>

      {selectedOption && (
        <View className="mt-5 rounded-2xl bg-gray-50 p-4">
          <Text className="text-sm font-bold text-gray-900">
            {selectedOption.description}
          </Text>
          <Text className="mt-1 text-sm leading-6 text-gray-600">
            {selectedOption.feedback}
          </Text>

          <View className="mt-4 flex-row justify-between">
            <Metric label="Money" value={metrics.money} />
            <Metric label="Safety" value={metrics.safety} />
            <Metric label="Growth" value={metrics.growth} />
          </View>
        </View>
      )}

      {isLastDecision && selectedOption && outcome && (
        <View
          className={`mt-5 rounded-2xl p-4 ${
            normalizedScore >= 80
              ? 'bg-emerald-50'
              : normalizedScore >= 45
                ? 'bg-amber-50'
                : 'bg-red-50'
          }`}
        >
          <Text className="text-base font-bold text-gray-900">
            {outcome.title}
          </Text>
          <Text className="mt-1 text-sm leading-6 text-gray-600">
            {outcome.description}
          </Text>
        </View>
      )}

      <Button
        label={isLastDecision ? 'Finish simulator' : 'Apply choice'}
        fullWidth
        className="mt-5"
        disabled={!selectedOptionId}
        onPress={goNext}
      />
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  const isPositive = value >= 0;

  return (
    <View className="items-center">
      <Text className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </Text>
      <Text
        className={`mt-1 text-sm font-bold ${
          isPositive ? 'text-emerald-600' : 'text-red-500'
        }`}
      >
        {isPositive ? '+' : ''}
        {value}
      </Text>
    </View>
  );
}
