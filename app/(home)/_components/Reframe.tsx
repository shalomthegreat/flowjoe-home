const steps = [
  "💡 Explore ideas",
  "📥 Collect the data",
  "🔗 Connect related thoughts",
  "🔍 Compare iterations",
  "✅ Track decisions",
  "🧠 Preserve context",
];

export default function Reframe() {
  return (
    <section className="bg-sand rounded-lg px-6 py-14 md:px-10 md:py-[70px] text-center my-[90px]">
      <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
        Before the first task is assigned
      </span>
      <h2 className="text-[32px] md:text-[48px] leading-heading mt-4 mb-6 font-display font-semibold text-espresso">
        Turn scattered information<br className="hidden md:block" /> into clear direction.
      </h2>
      <p className="text-lg md:text-xl max-w-[560px] mx-auto mb-10 text-espresso/90">
        Most productivity tools start after a clear plan exists. FlowJoe helps you get there.
      </p>
      <div className="flex flex-wrap justify-center gap-3.5 max-w-[820px] mx-auto">
        {steps.map((s) => (
          <span key={s} className="bg-cream-soft border border-latte rounded-full px-5 py-2.5 text-[15px] font-medium">
            {s}
          </span>
        ))}
      </div>
      <p className="mt-9 text-lg md:text-xl italic text-cinnamon">
        Then move into execution with confidence.
      </p>
    </section>
  );
}
