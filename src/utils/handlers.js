export const setKeyListeners = (callback) => {
  function handleKeyDown(e) {
    if (['Enter', '1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
      callback(e.key);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
};

export const isEnterKeyPressed = (key) => {
  if (key === 'Enter') {
    return true;
  }
  return false;
};

export const isValidKey = (key, colorsLength) => {
  if (Number(key) <= colorsLength || key === 'Enter') {
    return true;
  }
  return false;
};
