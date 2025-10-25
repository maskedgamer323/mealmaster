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
    instructions: ['Toast bread', 'Mash avocado with lemon, salt, pepper', 'Scramble eggs in oil', 'Assemble & season'],
    nutrition: { calories: 320, protein: 18, carbs: 24, fat: 18, fiber: 8, sugar: 2 },
    rating: 4.5,
    servings: 1,
    mealType: ['breakfast'],
    cuisine: 'American',
    tags: ['quick', 'healthy', 'protein-rich'],
    isVegetarian: true,
    isGlutenFree: false,
    isDairyFree: true
  },
  {
    id: '2',
    name: 'One-Pan Lemon Herb Chicken',
    image: 'https://images.unsplash.com/photo-1583118289889-f9e5ee78c82a?ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 25,
    prepTime: 10,
    totalTime: 35,
    difficulty: 'Easy',
    ingredients: ['Chicken breasts', 'Baby potatoes', 'Green beans', 'Lemon', 'Olive oil', 'Rosemary', 'Thyme', 'Garlic', 'Salt', 'Pepper'],
    instructions: ['Preheat oven 425°F', 'Toss potatoes with oil & herbs', 'Season chicken', 'Bake 15 min', 'Add beans, bake 10 min more'],
    nutrition: { calories: 420, protein: 35, carbs: 28, fat: 18, fiber: 5, sugar: 4 },
    rating: 4.6,
    servings: 4,
    mealType: ['dinner'],
    cuisine: 'American',
    tags: ['one-pan', 'easy-cleanup'],
    isVegetarian: false,
    isGlutenFree: true,
    isDairyFree: true
  },
  {
    id: '3',
    name: 'Quick Shrimp Stir-Fry',
    image: 'https://images.unsplash.com/photo-1703876087121-50a1c0a00e4d?ixlib=rb-4.1.0&q=80&w=1080',
    cookTime: 8,
    prepTime: 7,
    totalTime: 15,
    difficulty: 'Easy',
    ingredients: ['Shrimp', 'Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Sesame oil', 'Rice', 'Green onions'],
    instructions: ['Cook rice', 'Heat oil', 'Stir-fry garlic/ginger 30 s', 'Add shrimp 2-3 min', 'Add veg 3-4 min', 'Add soy sauce', 'Serve over rice'],
    nutrition: { calories: 380, protein: 28, carbs: 45, fat: 8, fiber: 4, sugar: 6 },
    rating: 4.5,
    servings: 2,
    mealType: ['lunch', 'dinner'],
    cuisine: 'Asian',
    tags: ['quick', 'protein-rich'],
    isVegetarian: false,
    isGlutenFree: true,
    isDairyFree: true
  }
];

export function getRecipeById(id) {
  return sampleRecipes.find(r => r.id === id);
}
