export type MealType = "breakfast" | "lunch" | "happy-hour" | "snack";

export interface MealItem {
  id: string;
  name: string;
  description: string;
  type: MealType;
}

export interface DayMeals {
  [date: string]: MealItem[];
}

export const mealTypeLabels: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  "happy-hour": "Happy Hour",
  snack: "Snack",
};

export const mealTypeColors: Record<MealType, string> = {
  breakfast: "meal-dot-breakfast",
  lunch: "meal-dot-lunch",
  "happy-hour": "meal-dot-happy-hour",
  snack: "meal-dot-snack",
};

let idCounter = 1;
const makeId = () => `meal-${idCounter++}`;

const defaultMeals: MealItem[] = [
  { id: makeId(), name: "French Toast", description: "Flavors available", type: "breakfast" },
  { id: makeId(), name: "Tea and Coffee", description: "Hot, cold or sweetened", type: "breakfast" },
  { id: makeId(), name: "Grilled Chicken Salad", description: "Fresh greens with grilled chicken", type: "lunch" },
  { id: makeId(), name: "Tomato Soup", description: "Classic creamy tomato", type: "lunch" },
  { id: makeId(), name: "Cocktails & Mocktails", description: "Signature drinks", type: "happy-hour" },
  { id: makeId(), name: "Cheese Board", description: "Assorted cheeses with crackers", type: "happy-hour" },
  { id: makeId(), name: "Fruit Bowl", description: "Seasonal fresh fruits", type: "snack" },
];

export function generateInitialMeals(year: number, month: number): DayMeals {
  const meals: DayMeals = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    // Give each day a semi-random selection of meals
    const dayMeals: MealItem[] = [];
    const seed = (day * 7 + month * 31) % 5;
    
    dayMeals.push({ ...defaultMeals[0], id: makeId() });
    dayMeals.push({ ...defaultMeals[2 + (seed % 2)], id: makeId() });
    dayMeals.push({ ...defaultMeals[4 + (seed % 2)], id: makeId() });
    if (day % 3 === 0) {
      dayMeals.push({ ...defaultMeals[6], id: makeId() });
    }
    
    meals[dateKey] = dayMeals;
  }
  return meals;
}

export function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
