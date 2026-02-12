import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onNewMeal: () => void;
  onExport: () => void;
  view: "day" | "week" | "month";
  onViewChange: (view: "day" | "week" | "month") => void;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onNewMeal,
  onExport,
  view,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
          <Button
            variant={view === "day" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => onViewChange("day")}
          >
            Day
          </Button>
          <Button
            variant={view === "week" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => onViewChange("week")}
          >
            Week
          </Button>
          <Button
            variant={view === "month" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => onViewChange("month")}
          >
            Month
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { onPrevMonth(); onPrevMonth(); }}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs font-medium" onClick={onToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { onNextMonth(); onNextMonth(); }}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={onExport}>
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>

        <Button size="sm" className="h-8 gap-1.5" onClick={onNewMeal}>
          <Plus className="h-3.5 w-3.5" />
          New Meal
        </Button>
      </div>
    </div>
  );
}
