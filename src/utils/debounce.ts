function debounce<
  Args extends never[],
  Func extends (...args: Args) => Rtrn,
  Rtrn = void,
>(func: Func, delay: number): (...args: Parameters<Func>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function handleDebounce(...args: Parameters<Func>) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      return func(...args);
    }, delay);
  };
}

export default debounce;
