const TOTAL_COLUMNS = 10;
const ROWS = 4;

export function setItemColors() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c, i) => ({
    [c]: {
      ...[1, 2, 3, 4].map((x) => {
        const index = {};
        return {
          [index[c * ROWS - ROWS + 1 + i]]: '',
        };
      }),
    },
  }));
  return { ...items };
}

export function setValidations() {
  const columns = new Array(TOTAL_COLUMNS).fill();
  const rows = new Array(ROWS).fill(0);

  return columns.map((column, index) => ({ [index + 1]: rows }));
}

export function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
