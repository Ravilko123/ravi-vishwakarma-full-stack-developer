import { X, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MealItem, mealTypeColors, mealTypeLabels, MealType } from "@/lib/meal-data";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MealDetailPanelProps {
  dateKey: string;
  meals: MealItem[];
  onClose: () => void;
  onAddMeal: (dateKey: string, meal: Omit<MealItem, "id">) => void;
  onDeleteMeal: (dateKey: string, mealId: string) => void;
}

const formatDateLabel = (dateKey: string) => {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};

export function MealDetailPanel({ dateKey, meals, onClose, onAddMeal, onDeleteMeal }: MealDetailPanelProps) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState<MealType>("breakfast");

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAddMeal(dateKey, { name: newName.trim(), description: newDesc.trim(), type: newType });
    setNewName("");
    setNewDesc("");
    setNewType("breakfast");
    setAdding(false);
  };

  const grouped = meals.reduce<Record<MealType, MealItem[]>>((acc, m) => {
    (acc[m.type] = acc[m.type] || []).push(m);
    return acc;
  }, {} as Record<MealType, MealItem[]>);

  const typeOrder: MealType[] = ["breakfast", "lunch", "happy-hour", "snack"];

  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-primary-foreground">Meal Details</h3>
          <p className="text-xs text-primary-foreground/70">{formatDateLabel(dateKey)}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/10" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {typeOrder.map((type) => {
          const items = grouped[type];
          if (!items || items.length === 0) return null;
          return (
            <div key={type}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`h-2 w-2 rounded-full ${mealTypeColors[type]}`} />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {mealTypeLabels[type]}
                </span>
              </div>
              <div className="space-y-2">
                {items.map((meal) => (
                  <div
                    key={meal.id}
                    className="group flex items-start justify-between rounded-lg border border-border bg-background p-3 transition-shadow hover:shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{meal.name}</p>
                      {meal.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{meal.description}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                      onClick={() => onDeleteMeal(dateKey, meal.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {meals.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No meals planned for this day.</p>
        )}
      </div>

      {/* Add form */}
      <div className="border-t border-border p-4">
        {adding ? (
          <div className="space-y-2">
            <Input placeholder="Meal name" value={newName} onChange={(e) => setNewName(e.target.value)} className="h-8 text-sm" />
            <Input placeholder="Description (optional)" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="h-8 text-sm" />
            <Select value={newType} onValueChange={(v) => setNewType(v as MealType)}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="happy-hour">Happy Hour</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 h-8" onClick={handleAdd}>Add</Button>
              <Button size="sm" variant="outline" className="h-8" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={() => setAdding(true)}>
            <Plus className="h-3.5 w-3.5" />
            Add Item
          </Button>
        )}
      </div>
    </div>
  );
}
