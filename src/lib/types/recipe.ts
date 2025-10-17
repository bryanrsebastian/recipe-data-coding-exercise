export interface RecipeType {
  sys: { id: string };
  name: string;
  nutritionalSummary: {
    energy: number;
    fat: number;
    fibre: number;
    protein: number;
    carbohydrate: number;
    sodium: number;
  };
  yield: number;
  ingredientsCollection: {
    total: number;
    items: IngredientsListType[];
  };
}

export interface RecipeNutritionIngredientsType {
  recipe: RecipeType;
  servings: number;
  unitSystem?: 'metric' | 'imperial';
}

export interface IngredientsListType {
  sys: { id: string };
  measurement?: string | null;
  metricMeasurement?: number | undefined;
  notes?: string | null;
  includedInNutrition?: boolean | undefined;
  food?: {
    sys: { id: string };
    name: string;
  };
  heading?: string | undefined;
}
