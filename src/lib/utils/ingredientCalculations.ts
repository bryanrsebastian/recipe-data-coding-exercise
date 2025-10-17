const ingredientCalculations = (
  value: number,
  unitSystem: 'metric' | 'imperial' = 'metric'
): { value: string; unit: string } => {
  let displayValue = value;
  let displayUnit = 'g/ml';

  if (unitSystem === 'metric') {
    // --- Metric Conversions ---
    if (value < 0.001) {
      // very small → mg/ml
      displayValue = value * 1000;
      displayUnit = 'mg/ml';
    } else if (value >= 1000) {
      // very large → kg/L
      displayValue = value / 1000;
      displayUnit = 'kg/L';
    } else {
      displayUnit = 'g/ml';
    }
  } else {
    // --- Imperial Conversions (from g/ml) ---
    const GRAMS_TO_OUNCES = 0.035274;   // g → oz
    const ML_TO_FLOZ = 0.033814;        // ml → fl oz
    const G_PER_ML_TO_OZ_PER_FLOZ = GRAMS_TO_OUNCES / ML_TO_FLOZ; // ≈ 1.04318
    const G_PER_ML_TO_LB_PER_FLOZ = (1 / 453.592) / ML_TO_FLOZ;   // g/ml → lb/fl oz

    if (value >= 1000) {
      // very dense → use lb/fl oz
      displayValue = value * G_PER_ML_TO_LB_PER_FLOZ;
      displayUnit = 'lb/fl oz';
    } else {
      // typical density → oz/fl oz
      displayValue = value * G_PER_ML_TO_OZ_PER_FLOZ;
      displayUnit = 'oz/fl oz';
    }
  }

  return {
    value: displayValue.toFixed(2),
    unit: displayUnit
  };
};

export default ingredientCalculations;