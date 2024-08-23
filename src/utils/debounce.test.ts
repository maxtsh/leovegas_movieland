import debounce from "./debounce"; // adjust the import to your file structure

const callback = vi.fn();

afterEach(() => {
  callback.mockReset();
});

afterAll(() => {
  callback.mockClear();
});

it("Debounce should call the function after the specified delay", () => {
  const debouncedFunc = debounce(callback, 100);

  debouncedFunc();
  expect(callback).not.toHaveBeenCalled(); // Should not be called immediately

  // Wait for more than the debounce delay
  return new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
    expect(callback).toHaveBeenCalled(); // Should be called after delay
  });
});

it("Debounce should clear previous timeout if called again within the delay", () => {
  const debouncedFunc = debounce(callback, 100);

  debouncedFunc();
  debouncedFunc(); // Call again within delay

  // Wait for more than the debounce delay
  return new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
    expect(callback).toHaveBeenCalledTimes(1); // Should be called only once
  });
});

it("Debounce should handle multiple calls with different arguments", () => {
  const debouncedFunc = debounce(callback, 100);

  debouncedFunc("arg1");
  debouncedFunc("arg2"); // Call again within delay

  // Wait for more than the debounce delay
  return new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
    // Check if the last argument passed is used
    expect(callback).toHaveBeenCalledWith("arg2");
  });
});
