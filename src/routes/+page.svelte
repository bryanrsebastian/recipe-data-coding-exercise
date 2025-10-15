<script lang="ts">
  import recipesData from '$lib/data/recipes.json';

  import NutritionDisplay from '$lib/components/NutritionDisplay.svelte';

  import type { Recipe, NutritionDisplayProps } from '$lib/types/recipe';

  const recipes:Recipe[] = recipesData.data.recipes;
  let selectedRecipe = recipes[0];

  let selectedServings:NutritionDisplayProps['servings'] = selectedRecipe.yield ?? 1;
  let selectedUnitSystem:NutritionDisplayProps['unitSystem'] = "metric";
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
    <NutritionDisplay
      recipe={selectedRecipe}
      servings={selectedServings}
      unitSystem={selectedUnitSystem}
    />
  </div>

  <!-- TODO: Replace this placeholder with your NutritionDisplay component -->
  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-yellow-800 mb-4">
      🚧 Implement NutritionDisplay Component Here
    </h3>

    <div class="text-sm text-yellow-700 mb-4">
      <p>Your component should display nutrition information AND ingredients list:</p>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-white rounded p-4 border">
        <h4 class="font-medium mb-2">Nutrition (per serving):</h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>Energy: {selectedRecipe.nutritionalSummary.energy} kJ</div>
          <div>Fat: {selectedRecipe.nutritionalSummary.fat}g</div>
          <div>Fibre: {selectedRecipe.nutritionalSummary.fibre}g</div>
          <div>Protein: {selectedRecipe.nutritionalSummary.protein}g</div>
          <div>Carbohydrate: {selectedRecipe.nutritionalSummary.carbohydrate}g</div>
          <div>Sodium: {selectedRecipe.nutritionalSummary.sodium}mg</div>
        </div>
      </div>

      <div class="bg-white rounded p-4 border">
        <h4 class="font-medium mb-2">Ingredients ({selectedRecipe.ingredientsCollection.total} items):</h4>
        <div class="space-y-1 text-sm">
          {#each selectedRecipe.ingredientsCollection.items as ingredient}
            {#if ingredient.food}
              <div>{ingredient.food.name}: {ingredient.metricMeasurement}g/ml</div>
            {:else if ingredient.heading}
              <div class="font-medium text-gray-600 mt-2">{ingredient.heading}</div>
            {/if}
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-4 text-sm text-yellow-700">
      <p>Replace this entire yellow section with:</p>
      <code class="bg-yellow-100 px-2 py-1 rounded text-xs">
        &lt;NutritionDisplay recipe={selectedRecipe} /&gt;
      </code>
    </div>
  </div>

  <!-- Uncomment when you've implemented your component:
  <NutritionDisplay recipe={selectedRecipe} />
  -->
</section>