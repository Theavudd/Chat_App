const debounce = (func: Function, timeout: number = 500) => {
  let timer: number;
  return (txt: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(txt);
    }, timeout);
  };
};

export default debounce;
