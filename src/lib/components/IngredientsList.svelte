<script lang="ts">
  import type { RecipeNutritionIngredientsType, RecipeType } from '$lib/types/recipe.ts';

  import servingCalculations from '$lib/utils/servingCalculations.js';
  import ingredientCalculations from '$lib/utils/ingredientCalculations.js';

  export let recipe: RecipeType;
  export let servings: RecipeNutritionIngredientsType['servings'];
  export let unitSystem: RecipeNutritionIngredientsType['unitSystem'];

  $: ingredients = recipe.ingredientsCollection.items || {};
  $: servings = servings;
  $: unitSystem = unitSystem;
</script>

<div class="nutrition-display p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
  <h3 class="text-lg font-semibold mb-4">Ingredeints List</h3>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
    {#each ingredients as ingredient}
      {#if ingredient.food}
        {@const calculated = servingCalculations(ingredient.metricMeasurement ?? 0, servings, recipe.yield)}
        {@const formatted = ingredientCalculations(calculated, unitSystem)}
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center text-xs">
          <span class="font-medium text-gray-700 capitalize">{ingredient.food.name}</span>
          <span class="text-gray-900">{formatted.value} {formatted.unit}</span>
        </div>
      {:else if ingredient.heading}
        <div class="col-span-full mt-4 mb-1">
          <hr class="mb-6 border-gray-100" />
          <h3 class="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            {ingredient.heading}
          </h3>
        </div>
      {/if}
    {/each}
  </div>
</div>