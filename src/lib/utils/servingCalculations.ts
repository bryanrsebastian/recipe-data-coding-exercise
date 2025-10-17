const servingCalculations = (
  originalValue: number,
  newServings: number,
  originalYield: number
) : number => {
  const calculated = originalValue * (newServings / originalYield);
  return parseFloat(calculated.toFixed(2));
};

export default servingCalculations;