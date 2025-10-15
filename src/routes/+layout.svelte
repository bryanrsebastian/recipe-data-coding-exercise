<script>
  import '../app.css';
</script>

<svelte:head>
  <title>Nutrition Display Exercise</title>
  <meta name="description" content="Front-end coding exercise - Nutrition Information Display Component" />
</svelte:head>

<main class="container mx-auto px-4 py-8 max-w-4xl">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">
      Nutrition Information Display
    </h1>
    <p class="text-gray-600">
      Select a recipe to view its nutrition information. Implement the NutritionDisplay component
      to show nutrition data with unit conversion and serving size adjustment features.
    </p>
  </header>

  <slot />

  <footer class="text-center text-sm text-gray-500 mt-12">
    <p>Front-end Developer Coding Exercise</p>
  </footer>
</main>