const cases = [
  { emoji: "💻", title: "For Solo Builders", text: "Plan features, track tasks, and keep all your product ideas organized and alive." },
  { emoji: "🎯", title: "For Visionaries", text: "Hone your ideas, from brainstorming to building, increasing overall planning efficiency." },
  { emoji: "🎧", title: "For Creators", text: "Gather inspiration, organize assets, and track progress across every stage." },
];

export default function UseCases() {
  return (
    <>
      <div className="text-center mb-[50px]">
        <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
          Give your next project a home
        </span>
        <h2 className="text-[32px] md:text-[48px] leading-heading mt-4 font-display font-semibold text-espresso">
          One workspace. Endless possibilities.
        </h2>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-[90px]">
        {cases.map((c) => (
          <div key={c.title} className="bg-cream-soft border border-latte rounded-md p-6">
            <div className="h-[120px] bg-sand rounded-xl mb-4 flex items-center justify-center">
              <span className="text-[48px]">{c.emoji}</span>
            </div>
            <h3 className="text-[26px] font-display font-semibold text-espresso">{c.title}</h3>
            <p className="text-lg mt-2 text-espresso/90">{c.text}</p>
            <a href="#" className="inline-block mt-3 font-medium text-espresso hover:text-cinnamon transition-colors">
              Learn more →
            </a>
          </div>
        ))}
      </section>
    </>
  );
}
