const PARTIAL_MATCH = 1;

export const isRowFilled = (turn) => !turn.some((filled) => filled === '');

export const getMatch = (turn, result) => {
  const partial = result.filter((x) => turn.includes(x)).map(() => 1);
  const full = result.filter((x, i) => turn[i] === x).map(() => 2);

  return Object.assign([], partial, full);
};

export const setGameScore = (match = [], column, timeElapsed, level) => {
  if (match.length) {
    const maxScore = 1000;

    const score = maxScore / column / timeElapsed;
    let partialScore = PARTIAL_MATCH;
    partialScore = match.reduce((a, b) => a + b, partialScore);
    return Math.floor(parseInt(score * partialScore * (level * 2), 10));
  }
};
