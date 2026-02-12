import * as XLSX from "xlsx";
import { DayMeals, mealTypeLabels } from "@/lib/meal-data";

export function exportMealsToExcel(meals: DayMeals, monthLabel: string) {
  const rows: { Date: string; Type: string; Name: string; Description: string }[] = [];

  const sortedKeys = Object.keys(meals).sort();
  for (const dateKey of sortedKeys) {
    for (const meal of meals[dateKey]) {
      rows.push({
        Date: dateKey,
        Type: mealTypeLabels[meal.type],
        Name: meal.name,
        Description: meal.description,
      });
    }
  }

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, monthLabel);
  XLSX.writeFile(wb, `meals-${monthLabel.replace(/\s+/g, "-").toLowerCase()}.xlsx`);
}
