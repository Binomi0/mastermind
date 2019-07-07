export const setKeyHandlers = (callback) => {
  function handleKeyDown(e) {
    if (['Enter', '1', '2', '3', '4', '5'].includes(e.key)) {
      callback(e.key);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
};
