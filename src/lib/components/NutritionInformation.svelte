<script lang="ts">
  import type { RecipeNutritionIngredientsType, RecipeType } from '$lib/types/recipe.ts';

  import servingCalculations from '$lib/utils/servingCalculations.js';
  import nutritionCalculations from '$lib/utils/nutritionCalculations.js';

  export let recipe: RecipeType;
  export let servings: RecipeNutritionIngredientsType['servings'];
  export let unitSystem: RecipeNutritionIngredientsType['unitSystem'];

  $: nutrition = recipe?.nutritionalSummary || {};
  $: servings = servings;
  $: unitSystem = unitSystem;
</script>

<div class="nutrition-display p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
  <h3 class="text-lg font-semibold mb-4">Nutrition Information</h3>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
    {#each Object.entries(nutrition) as [key, value]}
      {#if typeof value === 'number'}
        {@const calculated = servingCalculations(value, servings, recipe.yield)}

        <!-- If key is 'energy', don't convert — just keep kJ -->
        {@const formatted = key === 'energy'
          ? { value: calculated.toFixed(3), unit: 'kJ' }
          : nutritionCalculations(calculated, key === 'sodium' ? 'mg' : 'g', unitSystem)
        }

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center text-xs">
          <span class="font-medium text-gray-700 capitalize">{key}</span>
          <span class="text-gray-900">{formatted.value} {formatted.unit}</span>
        </div>
      {/if}
    {/each}
  </div>
</div>