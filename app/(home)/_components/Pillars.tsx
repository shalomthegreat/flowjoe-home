export default function Pillars() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 my-24">
      <div className="bg-sand rounded-md p-8 md:p-10">
        <span className="text-4xl block mb-3">🏠</span>
        <h2 className="text-2xl leading-subheading font-display font-semibold text-espresso">
          Your ideas deserves a home that belongs to you.
        </h2>
        <p className="text-lg mt-4 text-espresso/90">
          Local-first. Fast. Private. Built to stay with you long term.
        </p>
        <p className="text-lg mt-2 text-espresso font-semibold">
          Your work remains yours.
        </p>
      </div>
      <div className="bg-sand rounded-md p-8 md:p-10">
        <span className="text-4xl block mb-3">⏳</span>
        <h2 className="text-2xl leading-subheading font-display font-semibold text-espresso">
          Build something future you will thank you for.
        </h2>
        <p className="text-lg mt-4 text-espresso/90">
          Three weeks from now. Maybe three months from now. You open the project again. And somehow... you still know exactly what was going on.
        </p>
        <p className="text-lg mt-2 text-espresso font-semibold">
          No archaeological dig required.
        </p>
      </div>
    </section>
  );
}
