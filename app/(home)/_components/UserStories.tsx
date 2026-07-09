const stories = [
  {
    emoji: "💻",
    title: "The Solo Developer",
    items: [
      "Maps features.", "Tracks progress and priorities.", "Captures ideas as they appear.", "Converts them into AI-readable context.",
    ],
    close: "Open the project. See exactly where things stand. Keep moving.",
  },
  {
    emoji: "🎧",
    title: "The Creator",
    items: [
      "Collects inspiration.", "Tracks revisions.", "Connects AI outputs, notes, and references.", "Compares content to hone in on the best result.",
    ],
    close: "Pick up exactly where you left off, without skipping a beat.",
  },
];

export default function UserStories() {
  return (
    <>
      <div className="text-center mb-12">
        <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
          Two Stories. One Flow.
        </span>
        <h2 className="text-3xl md:text-5xl leading-heading mt-4 font-display font-semibold text-espresso">
          Built for the builders
        </h2>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 my-24">
        {stories.map((s) => (
          <div key={s.title} className="bg-cream-soft border border-latte rounded-md p-8 md:p-9">
            <span className="text-5xl block mb-3">{s.emoji}</span>
            <h3 className="text-2xl mb-4 font-display font-semibold text-espresso">{s.title}</h3>
            <ul className="pl-5 mb-5 list-disc text-lg text-espresso/90">
              {s.items.map((item) => (
                <li key={item} className="my-1.5">{item}</li>
              ))}
            </ul>
            <p className=" text-espresso text-lg font-medium">{s.close}</p>
          </div>
        ))}
      </section>
    </>
  );
}
