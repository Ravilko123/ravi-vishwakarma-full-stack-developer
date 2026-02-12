import XLSX from "xlsx-js-style";
import { DayMeals, MealType, mealTypeLabels } from "@/lib/meal-data";

const mealTypeExcelColors: Record<MealType, { bg: string; font: string }> = {
  breakfast: { bg: "F97316", font: "FFFFFF" },   // orange
  lunch: { bg: "0D9488", font: "FFFFFF" },        // teal
  "happy-hour": { bg: "8B5CF6", font: "FFFFFF" }, // purple
  snack: { bg: "EAB308", font: "000000" },        // yellow
};

function colToLetter(col: number): string {
  let s = "";
  col++;
  while (col > 0) {
    col--;
    s = String.fromCharCode(65 + (col % 26)) + s;
    col = Math.floor(col / 26);
  }
  return s;
}

function cellRef(r: number, c: number) {
  return `${colToLetter(c)}${r + 1}`;
}

export function exportMealsToExcel(meals: DayMeals, monthLabel: string) {
  const wb = XLSX.utils.book_new();

  // Build rows
  const rows: string[][] = [];
  const cellStyles: Map<string, { bg: string; font: string; bold?: boolean; header?: boolean }> = new Map();

  // Header row
  const headers = ["Date", "Meal Type", "Name", "Description"];
  rows.push(headers);
  headers.forEach((_, c) => {
    cellStyles.set(cellRef(0, c), { bg: "0D9488", font: "FFFFFF", bold: true, header: true });
  });

  const sortedKeys = Object.keys(meals).sort();
  let rowIdx = 1;
  for (const dateKey of sortedKeys) {
    const dayMeals = meals[dateKey];
    if (!dayMeals || dayMeals.length === 0) continue;

    for (const meal of dayMeals) {
      const colors = mealTypeExcelColors[meal.type];
      rows.push([dateKey, mealTypeLabels[meal.type], meal.name, meal.description]);

      // Color the meal type cell
      cellStyles.set(cellRef(rowIdx, 1), { bg: colors.bg, font: colors.font });
      rowIdx++;
    }
  }

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Set column widths
  ws["!cols"] = [
    { wch: 14 },  // Date
    { wch: 14 },  // Meal Type
    { wch: 28 },  // Name
    { wch: 40 },  // Description
  ];

  // Apply styles to cells
  for (const [ref, style] of cellStyles) {
    if (!ws[ref]) continue;
    ws[ref].s = {
      fill: { fgColor: { rgb: style.bg }, patternType: "solid" },
      font: {
        color: { rgb: style.font },
        bold: !!style.bold,
        sz: style.header ? 12 : 11,
      },
      alignment: { vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "D1D5DB" } },
        bottom: { style: "thin", color: { rgb: "D1D5DB" } },
        left: { style: "thin", color: { rgb: "D1D5DB" } },
        right: { style: "thin", color: { rgb: "D1D5DB" } },
      },
    };
  }

  // Style non-colored cells with borders and alternating rows
  for (let r = 1; r < rows.length; r++) {
    for (let c = 0; c < headers.length; c++) {
      const ref = cellRef(r, c);
      if (cellStyles.has(ref)) continue;
      if (!ws[ref]) continue;
      const isEven = r % 2 === 0;
      ws[ref].s = {
        fill: isEven ? { fgColor: { rgb: "F0FDFA" }, patternType: "solid" } : undefined,
        font: { color: { rgb: "1F2937" }, sz: 11 },
        alignment: { vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "D1D5DB" } },
          bottom: { style: "thin", color: { rgb: "D1D5DB" } },
          left: { style: "thin", color: { rgb: "D1D5DB" } },
          right: { style: "thin", color: { rgb: "D1D5DB" } },
        },
      };
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, monthLabel);
  XLSX.writeFile(wb, `meals-${monthLabel.replace(/\s+/g, "-").toLowerCase()}.xlsx`);
}
