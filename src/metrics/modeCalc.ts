export function modeCalculator(numbers: number[]): number {
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;
  let mode = 0;

  numbers.forEach((num) => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      mode = num;
    }
  });

  return mode;
}
