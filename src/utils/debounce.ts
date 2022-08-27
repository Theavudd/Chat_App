const debounce = (func: Function, timeout: number = 700) => {
  let timer: number;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
};

export default debounce;
