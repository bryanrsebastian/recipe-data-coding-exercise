/**
 * IngredientsList.test.ts
 *
 * Vitest + @testing-library/svelte style test (matches your earlier NutritionInformation test style)
 */

import { render } from '@testing-library/svelte';
import IngredientsList from './IngredientsList.svelte';
import type { RecipeNutritionIngredientsType, RecipeType } from '$lib/types/recipe';

// provide jest-dom matchers (ensure setupTests imports this globally in your vitest config)
// If you don't have a setup file, uncomment the next line:
// import '@testing-library/jest-dom';

// ---- Mock servingCalculations (separate mock) ----
vi.mock('$lib/utils/servingCalculations.js', () => ({
  default: vi.fn((measurement: number, servings: number, yieldValue: number) => {
    // replicate the real logic: scale measurement by servings/yield
    const result = measurement * (servings / yieldValue);
    // return a number like the real util (not string)
    return parseFloat(result.toFixed(2));
  }),
}));

// ---- Mock ingredientCalculations (separate mock) ----
vi.mock('$lib/utils/ingredientCalculations.js', () => ({
  default: vi.fn((value: number, unitSystem: 'metric' | 'imperial' = 'metric') => {
    // simple predictable formatting for tests:
    if (unitSystem === 'imperial') {
      // pretend conversion: grams -> oz (0.035274)
      const oz = value * 0.035274;
      // return strings matching your component display
      // show 'oz' for mass-like values here
      return { value: oz.toFixed(2), unit: 'oz' };
    }
    // metric: just return grams with two decimals
    return { value: value.toFixed(2), unit: 'g' };
  }),
}));

describe('IngredientsList component', () => {
  const mockRecipe: RecipeType = {
    sys: { id: '1' },
    name: 'Test Recipe',
    yield: 4,
    ingredientsCollection: {
      total: 3,
      items: [
        {
          sys: { id: '1' },
          metricMeasurement: 100, // grams
          food: { sys: { id: 'a1' }, name: 'tinned tuna' },
        },
        {
          sys: { id: '2' },
          heading: 'Sauce',
        },
        {
          sys: { id: '3' },
          metricMeasurement: 50,
          food: { sys: { id: 'a2' }, name: 'mayonnaise' },
        },
      ],
    },
    // nutritionalSummary can be empty for this component test
    nutritionalSummary: {
      energy: 0,
      fat: 0,
      fibre: 0,
      protein: 0,
      carbohydrate: 0,
      sodium: 0,
    },
  };

  const mockServings: RecipeNutritionIngredientsType['servings'] = 2;
  const mockUnitSystemMetric: RecipeNutritionIngredientsType['unitSystem'] = 'metric';
  const mockUnitSystemImperial: RecipeNutritionIngredientsType['unitSystem'] = 'imperial';

  it('renders ingredient names and headings (capitalized) and values in metric', () => {
    const { getByText } = render(IngredientsList, {
      recipe: mockRecipe,
      servings: mockServings,
      unitSystem: mockUnitSystemMetric,
    });

    // Title
    expect(getByText(/Ingredeints List/i)).toBeInTheDocument();

    // Ingredient names (component uses `capitalize` class)
    expect(getByText('Tinned tuna')).toBeInTheDocument();
    expect(getByText('Mayonnaise')).toBeInTheDocument();

    // Heading
    expect(getByText('Sauce')).toBeInTheDocument();

    // Metric units: since our mock returns "value.g", check for g
    // calculated: measurement * (servings / yield)
    // tinned tuna: 100 * (2/4) = 50.00 g
    expect(getByText('50.00 g')).toBeInTheDocument();

    // mayonnaise: 50 * (2/4) = 25.00 g
    expect(getByText('25.00 g')).toBeInTheDocument();
  });

  it('renders values correctly in imperial', () => {
    const { getByText } = render(IngredientsList, {
      recipe: mockRecipe,
      servings: mockServings,
      unitSystem: mockUnitSystemImperial,
    });

    // Imperial values use our mock ingredientCalculations -> oz (value * 0.035274)
    // tinned tuna: metric-scaled 50.00 g -> 50 * 0.035274 = 1.7637 -> 1.76 oz
    expect(getByText('1.76 oz')).toBeInTheDocument();

    // mayonnaise: 25.00 g -> 25 * 0.035274 = 0.88185 -> 0.88 oz
    expect(getByText('0.88 oz')).toBeInTheDocument();
  });

  it('handles missing metricMeasurement gracefully (defaults to 0)', () => {
    // create recipe with an ingredient missing metricMeasurement
    const recipeWithMissing: RecipeType = {
      ...mockRecipe,
      ingredientsCollection: {
        total: 1,
        items: [
          {
            sys: { id: '10' },
            food: { sys: { id: 'f10' }, name: 'no value item' },
            // metricMeasurement omitted
          },
        ],
      },
    };

    const { getByText } = render(IngredientsList, {
      recipe: recipeWithMissing,
      servings: mockServings,
      unitSystem: mockUnitSystemMetric,
    });

    // 0 * (2/4) => 0.00 g
    expect(getByText('0.00 g')).toBeInTheDocument();
    expect(getByText('No value item')).toBeInTheDocument();
  });
});
