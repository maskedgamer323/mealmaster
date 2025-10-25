// data/recipes.js
export const sampleRecipes = [
  {
    id: '1',
    name: 'Avocado Toast with Scrambled Eggs',
    image: 'https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBlZ2dzfGVufDF8fHx8MTc1NjMxMzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    cookTime: 15,
    prepTime: 5,
    totalTime: 20,
    difficulty: 'Easy',
    ingredients: ['Bread', 'Avocado', 'Eggs', 'Salt', 'Pepper', 'Olive oil', 'Lemon juice'],
    instructions: [
      'Toast the bread slices until golden brown',
      'Mash the avocado with salt, pepper, and lemon juice',
      'Scramble eggs in a pan with olive oil',
      'Spread avocado on toast and top with scrambled eggs',
      'Season with additional salt and pepper to taste'
    ],
    nutrition: { calories: 320, protein: 18, carbs: 24, fat: 18, fiber: 8, sugar: 2 },
    rating: 4.5,
    servings: 1,
    mealType: ['breakfast'],
    cuisine: 'American',
    tags: ['quick', 'healthy', 'protein-rich'],
    isVegetarian: true,
    isGlutenFree: false,
    isDairyFree: true
  }
];

// helper to grab one by id (returns undefined if not found)
export function getRecipeById(id) {
  return sampleRecipes.find(r => r.id === id);
}
