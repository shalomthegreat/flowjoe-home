export default function Nodes() {
  const items = [
    "Notes", "Images", "PDFs", "Audio",
    "Links", "AI Conversations", "Tasks", "Summaries",
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center my-24">
      <div>
        <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
          Folders are a thing of the past
        </span>
        <h2 className="text-3xl md:text-5xl leading-heading mt-4 font-display font-semibold text-espresso">
          Every node becomes a tiny world.
        </h2>
        <p className="text-lg mt-4 text-espresso/90">Like leaves on a tree, a single node can contain:</p>
        <ul className="columns-1 sm:columns-2 list-none p-0 mt-6 mb-6 text-lg text-espresso/90">
          {items.map((i) => (
            <li key={i} className="my-2"><span className="text-cinnamon font-semibold">✓ </span>{i}</li>
          ))}
        </ul>
        <p className="text-lg text-espresso/90">And FlowJoe remembers the relationships between each one.</p>
        <p className="text-lg mt-4 text-espresso font-medium">
          <strong>This is the place where the full context of an idea gives shape to the whole.</strong>
        </p>
      </div>
      <div className="h-80 md:h-96 bg-sand border border-dashed border-mocha rounded-lg flex items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-display font-semibold text-cinnamon italic">[ Example of a populated node ]</h2>
      </div>
    </section>
  );
}
