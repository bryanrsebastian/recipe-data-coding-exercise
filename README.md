# Front-End Developer Coding Exercise

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

2. **Automation testing:**
   ```bash
   npx svelte-check
   ```

---

## Project Structure

```
├── README.md                                      # This file
├── src/                                           # Main folder of the application
│   ├── lib/                                       # Reusable modules, utilities, components, and shared logic
│   │   ├── components/                            # Reusable UI components
│   │   │   ├── IngredientsList.svelte
│   │   │   ├── IngredientsList.test.ts
│   │   │   ├── NutritionInformation.svelte
│   │   │   └── NutritionInformation.test.ts
│   │   ├── data/                                  # Static JSON or data files used by the app
│   │   │   ├── README.md
│   │   │   └── recipes.json
│   │   ├── types/                                 # TypeScript type definitions and interfaces
│   │   │   └── recipe.ts
│   │   ├── utils/                                 # Utility/helper functions
│   │   │   ├── ingredientCalculations.ts
│   │   │   ├── nutritionCalculations.ts
│   │   │   └── servingCalculations.ts
│   ├── routes/                                    # Defines all the pages and routes of the SvelteKit app
│   │   ├── +layout.svelte                         # Shared layout for all pages
│   │   └── +page.svelte                           # Main page
│   ├── app.css                                    # Global stylesheet for your entire app
│   ├── app.html                                   # HTML template that wraps the Svelte app (root document)
│   └── app.svelte                                 # Root Svelte component, entry point of your UI
```

---

## Architectural Decisions

Since the application focuses on a single-page structure, I decided to place the main content inside `+page.svelte` under the `src/routes/` directory. This allows the page to serve as the central container for rendering the core components of the recipe data.

To maintain modularity and clean separation of concerns, the page delegates specific content sections to two dedicated components:
- **NutritionInformation.svelte** – displays computed nutritional values for the recipe.
- **IngredientsList.svelte** – displays the list of ingredients with their computed values.

Each component is paired with its own unit test file `(.test.ts)` to ensure maintainability and independent verification of rendering logic and calculation results.

For data and calculation logic, three dedicated utility files were created under `src/lib/utils/`:
- **servingCalculations.ts** – handles scaling based on serving sizes.
- **nutritionCalculations.ts** – processes nutrient conversions and formatting.
- **ingredientCalculations.ts** – manages ingredient unit conversions between metric and imperial systems.

Although the formatter functions are commonly shared across these utilities, they are kept inside their respective files to prevent naming conflicts and ensure consistent unit conversion behavior—especially when switching between metric (g/ml) and imperial (oz/fl oz) units.

This structure keeps the project:
- **Scalable**, by isolating logic into small, reusable modules.
- **Testable**, with separate test files for each component.
- **Readable**, by organizing code around function and responsibility.
- **Maintainable**, enabling future extensions (e.g., additional sections or conversions) without disrupting existing logic.

---

## Assumption and Trade-Offs
- Assuming all recipe data will always include `ingredientsCollection`.
- Assuming serving sizes are positive numbers.
- Assuming density values are always given in `g/ml`.
- Assuming converion of density values in imperial unit are always in `oz/fl oz` or `lb/fl oz`.
- Assuming the `recipe.ts` is a real data, the one that adjusted is the `src/lib/types/recipe.ts` for the `null` and `undefined` value.
- Choosing **simplicity over flexibility** by keeping only one page `(+page.svelte)`.
- Keeping **formatters inside utility files** (to avoid naming conflicts) at the cost of code duplication.
- Using **imperial conversion approximations** for readability rather than extreme precision.

---

## Time spent on the exercise

Total of **11 hrs**

- Reading of all instructions
- Understaing the requirements
- Familiarity with the structure
- Installation of the repository
- Understanding how the SvelteKit works
- Contructing of components
- Creating of utilities
- Creating this documentation
- Uploading in the hosting