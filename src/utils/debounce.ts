const debounce = (func: Function, timeout: number = 500) => {
  var timer: number;
  return (txt: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(txt);
    }, timeout);
  };
};

export default debounce;
