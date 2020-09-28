import {getLevelMessage, Rules} from '../levelMessage';

const goodRules: Rules = {
  defaultMessage: 'default message',
  levels: [
    {level: 'negative', max: 4, message: 'positive message', min: 0},
    {
      level: 'positive',
      max: 13,
      message: 'positive message',
      min: 12,
    },
  ],
};

const rulesOverlap: Rules = {
  defaultMessage: 'default message',
  levels: [
    {level: 'negative', max: 4, message: 'positive message', min: 0},
    {
      level: 'positive',
      max: 6,
      message: 'positive message',
      min: 2,
    },
  ],
};

const noMessageRule: Rules = {
  levels: [
    {
      level: 'positive',
      max: 13,
      min: 11,
    },
  ],
};

describe('getLevelMessage', () => {
  it('should return default message and no level', () => {
    const res = getLevelMessage(10, goodRules);
    expect(res).toEqual({level: null, message: 'default message'});
  });
  it('should return positive message and level', () => {
    const res = getLevelMessage(13, goodRules);
    expect(res).toEqual({level: 'positive', message: 'positive message'});
  });
  it('should throw an error', () => {
    try {
      getLevelMessage(9, rulesOverlap);
    } catch (error) {
      expect(error).toEqual(new Error('Thresholds levels overlap'));
    }
  });
  it('should return positive level and no message', () => {
    const res = getLevelMessage(13, noMessageRule);
    expect(res).toEqual({level: 'positive', message: null});
  });
});
