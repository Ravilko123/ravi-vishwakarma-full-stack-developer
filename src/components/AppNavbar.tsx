import { Leaf, Bell, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-primary px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary-foreground" />
        <span className="text-lg font-bold text-primary-foreground tracking-tight">LifeLoop</span>
      </div>

      <nav className="hidden sm:flex items-center gap-1">
        {["Menus", "Calendar", "Items"].map((tab, i) => (
          <Button
            key={tab}
            variant="ghost"
            size="sm"
            className={`text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 ${
              i === 0 ? "text-primary-foreground font-semibold border-b-2 border-primary-foreground rounded-none" : ""
            }`}
          >
            {tab}
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
