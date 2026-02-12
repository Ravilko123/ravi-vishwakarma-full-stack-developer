import { useState, useCallback } from "react";
import { AppNavbar } from "@/components/AppNavbar";
import { HeroSection } from "@/components/HeroSection";
import { CalendarHeader } from "@/components/CalendarHeader";
import { CalendarGrid } from "@/components/CalendarGrid";
import { MealDetailPanel } from "@/components/MealDetailPanel";
import { DayMeals, MealItem, generateInitialMeals, getDateKey } from "@/lib/meal-data";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [meals, setMeals] = useState<DayMeals>(() =>
    generateInitialMeals(new Date().getFullYear(), new Date().getMonth())
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleToday = useCallback(() => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(getDateKey(now));
  }, []);

  const handleAddMeal = useCallback((dateKey: string, meal: Omit<MealItem, "id">) => {
    setMeals((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { ...meal, id: `meal-${Date.now()}` }],
    }));
  }, []);

  const handleDeleteMeal = useCallback((dateKey: string, mealId: string) => {
    setMeals((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((m) => m.id !== mealId),
    }));
  }, []);

  const handleNewMeal = useCallback(() => {
    const key = selectedDate || getDateKey(new Date());
    setSelectedDate(key);
  }, [selectedDate]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavbar />
      <HeroSection />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onNewMeal={handleNewMeal}
          view={view}
          onViewChange={setView}
        />

        <div className="mt-4 flex gap-0">
          <div className={`flex-1 min-w-0 ${selectedDate ? "hidden sm:block" : ""}`}>
            <CalendarGrid
              currentDate={currentDate}
              meals={meals}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {selectedDate && (
            <div className="w-full sm:w-80 shrink-0">
              <MealDetailPanel
                dateKey={selectedDate}
                meals={meals[selectedDate] || []}
                onClose={() => setSelectedDate(null)}
                onAddMeal={handleAddMeal}
                onDeleteMeal={handleDeleteMeal}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
