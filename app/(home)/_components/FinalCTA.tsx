const scatter = [
  "🌐 12 tabs", "📁 4 folders", "📓 2 notebooks",
  "🤖 5 AI chats", "🖼 one mysterious screenshot",
];

export default function FinalCTA() {
  return (
    <section className="text-center pt-16 md:pt-24 pb-10 my-24">
      <h2 className="text-3xl md:text-5xl leading-heading font-display font-semibold text-espresso">
        Keep your project alive as it grows.
      </h2>
      <p className="text-lg md:text-xl mt-4 text-espresso">
        FlowJoe helps you capture ideas, preserve context, and maintain momentum.
      </p>
      <p className="text-lg md:text-xl mt-4 text-espresso">
        Why not start with the project currently spread across:
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-8">
        {scatter.map((s) => (
          <span key={s} className="bg-cream-soft border border-latte rounded-full px-5 py-2 text-sm text-espresso/90">
            {s}
          </span>
        ))}
      </div>
      <p className="text-lg italic text-cinnamon mt-4 mb-8">
        Or at the very least, give &ldquo;final_final_v2_REAL&rdquo; a home.
      </p>
      <a href="#" className="px-6 py-4 rounded-sm bg-espresso text-white font-medium border border-espresso">
        Take FlowJoe for a Spin
      </a>
    </section>
  );
}
