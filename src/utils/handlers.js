export const setKeyHandlers = (context, callback) => {
  function handleKeyDown(e) {
    if (['Enter', '1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
      callback(e.key);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
};
