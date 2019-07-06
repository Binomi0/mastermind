export const setKeyHandlers = (callback) => {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      callback(true);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
};
