import { useMemo } from "react";
import { DayMeals, MealItem, mealTypeColors, mealTypeLabels, getDateKey } from "@/lib/meal-data";

interface CalendarGridProps {
  currentDate: Date;
  meals: DayMeals;
  selectedDate: string | null;
  onSelectDate: (dateKey: string) => void;
}

const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CalendarGrid({ currentDate, meals, selectedDate, onSelectDate }: CalendarGridProps) {
  const today = getDateKey(new Date());

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: Date; dateKey: string; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({ date: d, dateKey: getDateKey(d), isCurrentMonth: false });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      days.push({ date: d, dateKey: getDateKey(d), isCurrentMonth: true });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, dateKey: getDateKey(d), isCurrentMonth: false });
    }

    return days;
  }, [currentDate]);

  const maxVisible = 3;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/50">
        {dayLabels.map((day) => (
          <div key={day} className="px-2 py-2.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, dateKey, isCurrentMonth }) => {
          const dayMeals = meals[dateKey] || [];
          const isToday = dateKey === today;
          const isSelected = dateKey === selectedDate;
          const extraCount = dayMeals.length - maxVisible;

          return (
            <button
              key={dateKey}
              onClick={() => onSelectDate(dateKey)}
              className={`
                relative min-h-[100px] border-b border-r border-border p-1.5 text-left transition-colors
                hover:bg-calendar-hover focus:outline-none focus:ring-1 focus:ring-ring focus:ring-inset
                ${!isCurrentMonth ? "opacity-40" : ""}
                ${isSelected ? "bg-accent/50 ring-1 ring-primary/30" : ""}
              `}
            >
              <span
                className={`
                  inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium
                  ${isToday ? "bg-primary text-primary-foreground" : "text-foreground"}
                `}
              >
                {date.getDate()}
              </span>

              <div className="mt-1 space-y-0.5">
                {dayMeals.slice(0, maxVisible).map((meal) => (
                  <div key={meal.id} className="flex items-center gap-1 truncate">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${mealTypeColors[meal.type]}`} />
                    <span className="truncate text-[10px] leading-tight text-foreground/80">
                      {mealTypeLabels[meal.type]}
                    </span>
                  </div>
                ))}
                {extraCount > 0 && (
                  <span className="text-[10px] font-medium text-primary">
                    +{extraCount} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
