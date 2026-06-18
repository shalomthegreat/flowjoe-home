export default function TreeVisual() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-[60px] items-center my-[90px]">
      <div className="bg-espresso text-cream rounded-lg p-8 md:p-10 shadow-soft">
        <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 text-peach font-semibold">
          🚀 Product Launch
        </span>
        <div className="pl-9 ml-5 border-l border-cream/30 mt-2">
          <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">
            🔬 Research
          </span>
          <div className="pl-9 ml-5 border-l border-cream/30 mt-2">
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Customer Interviews</span>
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Competitor Analysis</span>
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Screenshots</span>
          </div>
          <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border-2 border-peach mt-2">
            🛠 MVP
          </span>
          <div className="pl-9 ml-5 border-l border-cream/30 mt-2">
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Features</span>
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Wireframes</span>
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Tasks</span>
          </div>
          <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">
            📣 Marketing
          </span>
          <div className="pl-9 ml-5 border-l border-cream/30 mt-2">
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Messaging</span>
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Assets</span>
            <span className="inline-block bg-cream/10 rounded-lg px-5 py-3 text-[15px] font-medium border border-cream/20 mt-2">Launch Plan</span>
          </div>
        </div>
      </div>
      <div>
        <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
          The Secret Sauce.
        </span>
        <h2 className="text-[32px] md:text-[48px] leading-heading mt-4 font-display font-semibold text-espresso">
          Every project has a story, and FlowJoe lets you see it grow.
        </h2>
        <p className="text-lg mt-4 text-espresso/90">Projects naturally branch.</p>
        <ul className="text-lg leading-chain my-6 pl-0 list-none text-espresso/90">
          <li><span className="text-cinnamon">→ </span>Ideas lead to research.</li>
          <li><span className="text-cinnamon">→ </span>Research leads to decisions.</li>
          <li><span className="text-cinnamon">→ </span>Decisions lead to action.</li>
        </ul>
        <p className="text-lg text-espresso"><strong>The tree keeps the story connected.</strong></p>
      </div>
    </section>
  );
}
