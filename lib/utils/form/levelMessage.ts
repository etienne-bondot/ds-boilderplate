import {ReactNode} from 'react';

export type Level = 'positive' | 'negative';

type Message = ReactNode | string;

type LevelThresholds = {
  min: number;
  max: number;
  level: Level;
  message?: Message;
};

export type Rules = {
  defaultMessage?: Message;
  levels: LevelThresholds[];
};

export type LevelMessage = {
  level: Level | null | undefined;
  message: Message | null | undefined;
};

export const getLevelMessage = (value: number, rules: Rules): LevelMessage => {
  const defaultMessage = rules.defaultMessage ?? null;

  const levels = rules.levels;

  const levelsFromValue = levels.filter(({min, max}) => {
    return min <= value && value <= max;
  });

  if (levelsFromValue.length > 1) {
    throw new Error('Thresholds levels overlap');
  }

  if (levelsFromValue.length < 1) {
    return {
      level: null,
      message: defaultMessage,
    };
  }

  const {level, message} = levelsFromValue[0];
  return {level, message: message ?? null};
};

export const getColorFromLevel = (level: Level | null | undefined): string => {
  switch (level) {
    case 'positive':
      return 'positive';
    case 'negative':
      return 'negative';
    default:
      return 'label_primary';
  }
};
