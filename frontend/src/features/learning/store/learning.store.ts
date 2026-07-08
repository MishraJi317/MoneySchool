import { create } from 'zustand';

import { LEARNING_STAGES } from '../constants';
import { getPersonalizedLearningPath } from '../services/mockLearning';
import {
  LearningPathResponse,
  LearningStage,
  LearningTopic,
  Persona,
  TopicId,
} from '../types';

interface LearningState {
  loading: boolean;
  persona: Persona;
  topics: LearningTopic[];
  orderedTopicIds: TopicId[];
  currentTopic: TopicId | null;
  completedTopics: TopicId[];
  currentLesson: LearningStage;
  xp: number;
  stars: number;
  quizScore: number;
  simulatorCompleted: boolean;
  lastSimulatorChoiceId: string | null;
  loadLearningPath: (persona?: Persona) => Promise<void>;
  startTopic: (topicId: TopicId) => void;
  completeLesson: () => void;
  completeQuiz: (score: number) => void;
  completeSimulator: (choiceId?: string) => void;
  unlockNextTopic: () => void;
  resetTopicFlow: () => void;
}

function getFirstIncompleteTopic(
  orderedTopicIds: TopicId[],
  completedTopics: TopicId[]
) {
  return (
    orderedTopicIds.find((topicId) => !completedTopics.includes(topicId)) ??
    orderedTopicIds[0] ??
    null
  );
}

function getNextStage(stage: LearningStage): LearningStage {
  const index = LEARNING_STAGES.findIndex((item) => item.id === stage);
  return LEARNING_STAGES[Math.min(index + 1, LEARNING_STAGES.length - 1)].id;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  loading: false,
  persona: 'Student',
  topics: [],
  orderedTopicIds: [],
  currentTopic: null,
  completedTopics: [],
  currentLesson: 'theory',
  xp: 0,
  stars: 0,
  quizScore: 0,
  simulatorCompleted: false,
  lastSimulatorChoiceId: null,

  loadLearningPath: async (persona = 'Student') => {
    set({ loading: true });

    const response: LearningPathResponse =
      await getPersonalizedLearningPath(persona);

    set((state) => ({
      loading: false,
      persona: response.persona,
      topics: response.topics,
      orderedTopicIds: response.orderedTopicIds,
      currentTopic:
        state.currentTopic ??
        getFirstIncompleteTopic(response.orderedTopicIds, state.completedTopics),
    }));
  },

  startTopic: (topicId) => {
    set({
      currentTopic: topicId,
      currentLesson: 'theory',
      quizScore: 0,
      simulatorCompleted: false,
      lastSimulatorChoiceId: null,
    });
  },

  completeLesson: () => {
    set((state) => ({
      currentLesson: getNextStage(state.currentLesson),
      xp: state.xp + 10,
    }));
  },

  completeQuiz: (score) => {
    set((state) => ({
      currentLesson: getNextStage(state.currentLesson),
      quizScore: score,
      xp: state.xp + score * 5,
      stars: state.stars + (score >= 80 ? 3 : score >= 50 ? 2 : 1),
    }));
  },

  completeSimulator: (choiceId) => {
    set((state) => ({
      currentLesson: getNextStage(state.currentLesson),
      simulatorCompleted: true,
      lastSimulatorChoiceId: choiceId ?? null,
      xp: state.xp + 15,
    }));
  },

  unlockNextTopic: () => {
    const { currentTopic, orderedTopicIds, completedTopics } = get();

    if (!currentTopic) return;

    const nextCompletedTopics = completedTopics.includes(currentTopic)
      ? completedTopics
      : [...completedTopics, currentTopic];
    const nextTopic = getFirstIncompleteTopic(orderedTopicIds, nextCompletedTopics);

    set({
      completedTopics: nextCompletedTopics,
      currentTopic: nextTopic,
      currentLesson: 'theory',
      quizScore: 0,
      simulatorCompleted: false,
      lastSimulatorChoiceId: null,
    });
  },

  resetTopicFlow: () => {
    set({
      currentLesson: 'theory',
      quizScore: 0,
      simulatorCompleted: false,
      lastSimulatorChoiceId: null,
    });
  },
}));
