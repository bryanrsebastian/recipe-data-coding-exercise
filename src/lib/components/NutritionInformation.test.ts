import { render } from '@testing-library/svelte';
import NutritionInformation from './NutritionInformation.svelte';
import type { RecipeNutritionIngredientsType, RecipeType } from '$lib/types/recipe';

// Optional: If you don’t already import jest-dom globally in setup
// import '@testing-library/jest-dom';

// --- Mock servingCalculations ---
vi.mock('$lib/utils/servingCalculations.js', () => ({
  default: vi.fn((value: number, servings: number, yieldValue: number) => {
    // Simulate scaling based on servings/yield (like real logic)
    const scaled = value * (servings / yieldValue);
    return parseFloat(scaled.toFixed(2));
  }),
}));

// --- Mock nutritionCalculations ---
vi.mock('$lib/utils/nutritionCalculations.js', () => ({
  default: vi.fn((value: number, baseUnit: string, unitSystem: 'metric' | 'imperial') => {
    if (unitSystem === 'imperial') {
      // Convert grams → ounces (approx 0.035274)
      const oz = value * 0.035274;
      return { value: oz.toFixed(2), unit: 'oz' };
    }
    // Metric path (simple passthrough)
    if (baseUnit === 'mg') return { value: value.toFixed(2), unit: 'mg' };
    return { value: value.toFixed(2), unit: 'g' };
  }),
}));

describe('NutritionInformation component', () => {
  const mockRecipe: RecipeType = {
    sys: { id: '1' },
    name: 'Test Recipe',
    yield: 4,
    ingredientsCollection: {
      total: 2,
      items: [
        {
          sys: { id: '1' },
          metricMeasurement: 2,
          food: { sys: { id: '1' }, name: 'Salt' },
        },
        {
          sys: { id: '2' },
          metricMeasurement: 100,
          food: { sys: { id: '1' }, name: 'Sugar' },
        },
      ],
    },
    nutritionalSummary: {
      energy: 2165.97,
      fat: 3.83,
      fibre: 23.93,
      protein: 33.79,
      carbohydrate: 39.05,
      sodium: 369.75,
    },
  };

  const mockServings: RecipeNutritionIngredientsType['servings'] = 2;
  const mockUnitSystem: RecipeNutritionIngredientsType['unitSystem'] = 'metric';

  it('renders all nutrition entries correctly', () => {
    const { getByText } = render(NutritionInformation, {
      recipe: mockRecipe,
      servings: mockServings,
      unitSystem: mockUnitSystem,
    });

    expect(getByText('energy')).toBeInTheDocument();
    expect(getByText(/kJ/)).toBeInTheDocument();

    expect(getByText('fat')).toBeInTheDocument();
    expect(getByText('fibre')).toBeInTheDocument();
    expect(getByText('protein')).toBeInTheDocument();
    expect(getByText('carbohydrate')).toBeInTheDocument();
    expect(getByText(/g/)).toBeInTheDocument();

    expect(getByText('sodium')).toBeInTheDocument();
    expect(getByText(/mg|g/)).toBeInTheDocument();
  });

  it('calculates values correctly for metric servings', () => {
    const { getByText } = render(NutritionInformation, {
      recipe: mockRecipe,
      servings: 2,
      unitSystem: 'metric',
    });

    // Mocked servingCalculations halves everything (servings 2 / yield 4 = 0.5)
    expect(getByText('1082.99 kJ')).toBeInTheDocument(); // Energy
    expect(getByText('1.92 g')).toBeInTheDocument(); // Fat
    expect(getByText('11.97 g')).toBeInTheDocument(); // Fibre
    expect(getByText('16.90 g')).toBeInTheDocument(); // Protein
    expect(getByText('19.52 g')).toBeInTheDocument(); // Carbohydrate
    expect(getByText('184.88 mg')).toBeInTheDocument(); // Sodium
  });

  it('calculates values correctly for imperial units', () => {
    const { getByText } = render(NutritionInformation, {
      recipe: mockRecipe,
      servings: 8,
      unitSystem: 'imperial',
    });

    // ServingCalculations mock: 8 / 4 = 2x → doubles all values, then nutritionCalculations converts g→oz
    // Example: Fat: 3.83 * 2 = 7.66 → 7.66 * 0.035274 = 0.27 oz
    expect(getByText('4331.94 kJ')).toBeInTheDocument(); // Energy (not converted)
    expect(getByText('0.27 oz')).toBeInTheDocument(); // Fat
    expect(getByText('1.68 oz')).toBeInTheDocument(); // Fibre
    expect(getByText('2.38 oz')).toBeInTheDocument(); // Protein
    expect(getByText('2.75 oz')).toBeInTheDocument(); // Carbohydrate
    expect(getByText('0.03 oz')).toBeInTheDocument(); // Sodium
  });
});