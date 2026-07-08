import {
  DEFAULT_TOPIC_IDS,
  PERSONA_TOPIC_ORDER,
  TOPIC_CATALOG,
} from '../constants';
import { LearningPathResponse, LearningTopic, Persona, TopicId } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function uniqueOrderedTopicIds(topicIds: TopicId[]) {
  const seen = new Set<TopicId>();
  const ordered = topicIds.filter((topicId) => {
    if (seen.has(topicId)) return false;
    seen.add(topicId);
    return true;
  });

  const missingDefaults = DEFAULT_TOPIC_IDS.filter((topicId) => !seen.has(topicId));

  return [...ordered, ...missingDefaults];
}

export async function getPersonalizedLearningPath(
  persona: Persona = 'Student'
): Promise<LearningPathResponse> {
  await delay(500);

  const orderedTopicIds = uniqueOrderedTopicIds(
    PERSONA_TOPIC_ORDER[persona] ?? DEFAULT_TOPIC_IDS
  );

  const topics: LearningTopic[] = orderedTopicIds.map(
    (topicId) => TOPIC_CATALOG[topicId]
  );

  return {
    persona,
    orderedTopicIds,
    topics,
  };
}
