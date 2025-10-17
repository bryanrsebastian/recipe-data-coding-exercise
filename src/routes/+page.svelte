<script lang="ts">
  import recipesData from '$lib/data/recipes.json';

  import type { RecipeType, RecipeNutritionIngredientsType } from '$lib/types/recipe.ts';

  import NutritionInformation from '$lib/components/NutritionInformation.svelte';
  import IngredientsList from '$lib/components/IngredientsList.svelte';

  const recipes:RecipeType[] = recipesData.data.recipes;
  let selectedRecipe = recipes[0];

  let selectedServings:RecipeNutritionIngredientsType['servings'] = selectedRecipe.yield ?? 1;
  let selectedUnitSystem:RecipeNutritionIngredientsType['unitSystem'] = "metric";
</script>

<section class="mb-8">
  <h2 class="text-xl font-semibold mb-4">Select Recipe</h2>
  <div class="flex flex-wrap gap-2">
    {#each recipes as recipe}
      <button
        class="px-4 py-2 rounded-lg border transition-colors {selectedRecipe.sys.id === recipe.sys.id
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}"
        on:click={() => {
          selectedRecipe = recipe;
          selectedServings = recipe.yield;
        }}
      >
        {recipe.name}
      </button>
    {/each}
  </div>
</section>

<section class="mb-8">
  <h2 class="text-xl font-semibold mb-4">Recipe: {selectedRecipe.name}</h2>
  <div class="bg-gray-50 p-4 rounded-lg mb-6">
    <h3 class="font-bold mb-3">Recipe Details</h3>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1 py-2 px-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <label for="serving-size" class="block text-gray-700 mb-2 font-bold text-sm">
          Serving Size: <span class="text-blue-600 font-medium">{selectedServings.toFixed(1)}</span>
        </label>
        <input
          id="serving-size"
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          bind:value={selectedServings}
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div class="flex justify-between text-xs text-gray-500 mt-2">
          <span>0.1x</span>
          <span>10x</span>
        </div>
      </div>
      <div class="flex-1 py-2 px-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p class="text-gray-700 mb-2 font-bold text-sm">Ingredients: <span class="font-medium">{selectedRecipe.ingredientsCollection.total}</span></p>
        <p class="text-gray-700 mb-2 font-bold text-sm">Unit System:</p>
        <div class="flex items-center gap-1">
          <button
            type="button"
            class:text-blue-600={selectedUnitSystem === "metric"}
            class:text-gray-500={selectedUnitSystem !== "metric"}
            class="font-medium cursor-pointer transition-colors text-sm"
            on:click={() => selectedUnitSystem = "metric"}
          >
            Metric
          </button>

          <button
            class="relative w-12 h-6 rounded-full transition-colors duration-300"
            class:bg-blue-500={selectedUnitSystem === "metric"}
            class:bg-orange-500={selectedUnitSystem === "imperial"}
            on:click={() => selectedUnitSystem = selectedUnitSystem === "metric" ? 'imperial' : 'metric'}
          >
            <span
              class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"
              class:translate-x-6={selectedUnitSystem === "imperial"}
            ></span>
          </button>

          <button
            type="button"
            class:text-orange-500={selectedUnitSystem === "imperial"}
            class:text-gray-500={selectedUnitSystem !== "imperial"}
            class="font-medium cursor-pointer transition-colors text-sm"
            on:click={() => selectedUnitSystem = "imperial"}
          >
            Imperial
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
    <NutritionInformation
      recipe={selectedRecipe}
      servings={selectedServings}
      unitSystem={selectedUnitSystem}
    />
    <br/>
    <IngredientsList
      recipe={selectedRecipe}
      servings={selectedServings}
      unitSystem={selectedUnitSystem}
    />
  </div>

</section>