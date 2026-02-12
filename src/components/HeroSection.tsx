import heroImage from "@/assets/hero-image.webp";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-accent/30 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Plan Every Meal,{" "}
              <span className="text-primary">Every Day</span>
            </h1>
            <p className="mt-3 max-w-lg text-base text-muted-foreground mx-auto lg:mx-0">
              Organize breakfast, lunch, happy hour and more with an intuitive calendar. 
              Keep your community nourished and informed.
            </p>
          </div>
          <div className="w-full max-w-md lg:max-w-lg shrink-0">
            <img
              src={heroImage}
              alt="LifeLoop meal planning calendar on desktop and mobile"
              className="w-full rounded-xl shadow-lg border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
