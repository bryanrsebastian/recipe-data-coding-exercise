const nutritionCalculations = (
  value: number,
  baseUnit: 'mg' | 'g' | 'ml',
  unitSystem: 'metric' | 'imperial' = 'metric'
) : { value: string; unit: string } => {
  // --- Metric conversions ---
  if (unitSystem === 'metric') {
    if (baseUnit === 'mg') {
      if (value >= 1000) return { value: (value / 1000).toFixed(2), unit: 'g' };
      return { value: value.toFixed(2), unit: 'mg' };
    }
    if (baseUnit === 'g') {
      if (value >= 1000) return { value: (value / 1000).toFixed(2), unit: 'kg' };
      return { value: value.toFixed(2), unit: 'g' };
    }
    if (baseUnit === 'ml') {
      if (value >= 1000) return { value: (value / 1000).toFixed(2), unit: 'L' };
      return { value: value.toFixed(2), unit: 'ml' };
    }
  }

  // --- Imperial conversions ---
  if (unitSystem === 'imperial') {
    if (baseUnit === 'g') {
      const oz = value * 0.035274;
      if (oz >= 16) return { value: (oz / 16).toFixed(2), unit: 'lb' }; // 16 oz = 1 lb
      return { value: oz.toFixed(2), unit: 'oz' };
    }
    if (baseUnit === 'mg') {
      // Convert mg → g first, then to oz
      const oz = (value / 1000) * 0.035274;
      if (oz >= 16) return { value: (oz / 16).toFixed(2), unit: 'lb' };
      return { value: oz.toFixed(2), unit: 'oz' };
    }
    if (baseUnit === 'ml') {
      const flOz = value * 0.033814;
      return { value: flOz.toFixed(2), unit: 'fl oz' };
    }
  }

  return { value: value.toFixed(2), unit: baseUnit };
}

export default nutritionCalculations;