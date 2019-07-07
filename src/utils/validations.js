const PERFECT_MATCH = 2;
const PARTIAL_MATCH = 1;

export const isRowFilled = (turn) => !turn.some((filled) => filled === '');

export const getMatch = (turn, result) => {
  let exactMatches = [];
  const newTurn = Object.values(turn);
  newTurn.forEach((match, i) => {
    if (match === result[i]) {
      exactMatches.push(match);
    }
  });

  let partialMatches = [];
  newTurn.forEach((match) => {
    if (
      result.indexOf(match) > -1 &&
      !partialMatches.includes(match) &&
      !exactMatches.includes(match)
    ) {
      partialMatches.push(match);
    }
  });

  let matches = [];
  exactMatches.forEach((item) => {
    matches.push(PERFECT_MATCH);
  });
  partialMatches.forEach((item) => {
    matches.push(PARTIAL_MATCH);
  });

  return matches;
};

export const setGameScore = (match, column, timeElapsed, level) => {
  const maxScore = 1000;

  const score = maxScore / column / timeElapsed;
  let partialScore = PARTIAL_MATCH;
  if (match.length) {
    partialScore = match.reduce((a, b) => a + b, partialScore);
  }
  return Math.floor(parseInt(score * partialScore * (level * 2), 10));
};
