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
  newTurn.forEach((match, i) => {
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
    matches.push(2);
  });
  partialMatches.forEach((item) => {
    matches.push(1);
  });

  return matches;
};

export const setGameScore = (match, index, lastScore) => {
  // console.log('lastScore', lastScore);
  localStorage.setItem(`turn-${index}`, JSON.stringify(match));
  let score = 0;
  if (match.length) {
    score = match.reduce((a, b) => a + b, score);
    score = score * (10 - index);
  }
  return score + lastScore;
};
