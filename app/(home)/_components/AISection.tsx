const items = [
  "📝 Notes", "🔬 Research", "📌 References",
  "🖼 Media", "✅ Decisions", "🔗 Relationships",
];

export default function AISection() {
  return (
    <section className="bg-espresso text-cream rounded-lg px-6 py-14 md:px-12 md:py-16 text-center my-24">
      <h2 className="text-3xl md:text-5xl leading-subheading font-display font-semibold text-cream">
        Most AI starts with a blank page.<br />
        <span className="text-peach">FlowJoe starts with context.</span>
      </h2>
      <p className="text-lg md:text-xl max-w-xl mx-auto mt-5 text-cream/90">
        Because your project already contains:
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-8">
        {items.map((i) => (
          <span key={i} className="border border-cream/35 rounded-full px-5 py-2 text-sm text-cream/90">
            {i}
          </span>
        ))}
      </div>
      <p className="text-lg md:text-xl max-w-xl mx-auto text-cream/90">
        FlowJoe's AI can help without making you explain everything from scratch.
      </p>
      <p className="font-display text-2xl italic mt-6 text-cream">
        Less prompting. More progress.
      </p>
    </section>
  );
}
