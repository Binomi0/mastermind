const TOTAL_ITEMS = 40;
const TOTAL_COLUMNS = 10;
const ROWS = 4;

// export const setValidations = {
//   1: [0, 0, 0, 0],
//   2: [0, 0, 0, 0],
//   3: [0, 0, 0, 0],
//   4: [0, 0, 0, 0],
//   5: [0, 0, 0, 0],
//   6: [0, 0, 0, 0],
//   7: [0, 0, 0, 0],
//   8: [0, 0, 0, 0],
//   9: [0, 0, 0, 0],
//   10: [0, 0, 0, 0],
// };

// export const setRowItems = {
//   1: {
//     1: '',
//     2: '',
//     3: '',
//     4: '',
//   },
//   2: {
//     5: '',
//     6: '',
//     7: '',
//     8: '',
//   },
//   3: {
//     9: '',
//     10: '',
//     11: '',
//     12: '',
//   },
//   4: {
//     13: '',
//     14: '',
//     15: '',
//     16: '',
//   },
//   5: {
//     17: '',
//     18: '',
//     19: '',
//     20: '',
//   },
//   6: {
//     21: '',
//     22: '',
//     23: '',
//     24: '',
//   },
//   7: {
//     25: '',
//     26: '',
//     27: '',
//     28: '',
//   },
//   8: {
//     29: '',
//     30: '',
//     31: '',
//     32: '',
//   },
//   9: {
//     33: '',
//     34: '',
//     35: '',
//     36: '',
//   },
//   10: {
//     37: '',
//     38: '',
//     39: '',
//     40: '',
//   },
// };

function setRowItems(column, obj) {
  let rows = {};
  for (let i = 0; i < 4; ++i) {
    rows[column * ROWS - ROWS + 1 + i] = obj[column + i];
  }
  return rows;
}

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
  const columns = new Array(10).fill();
  const rows = new Array(4).fill(0);

  return columns.map((column, index) => ({ [index + 1]: rows }));
}
