import React from "react";

interface NodeProps {
  children: React.ReactNode;
  variant?: "root" | "highlight" | "default";
}

function Node({ children, variant = "default" }: NodeProps) {
  const base = "inline-block bg-cream/10 rounded-lg px-5 py-3 mr-1 text-base font-medium";
  const styles = {
    root: "border border-cream/20 text-peach font-semibold",
    highlight: "border-2 border-peach mt-2",
    default: "border border-cream/20 mt-2",
  };

  return (
    <span className={`${base} ${styles[variant]}`}>
      {children}
    </span>
  );
}

function Branch({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-9 ml-5 border-l border-cream/30 my-2">
      {children}
    </div>
  );
}

export default function TreeVisual() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center my-24">
      <div className="bg-espresso text-cream rounded-lg p-8 md:p-10 shadow-soft">
        <Node variant="root">🚀 Product Launch</Node>
        <Branch>
          <Node>🔬 Research</Node>
          <Branch>
            <Node>Customer Interviews</Node>
            <Node>Competitor Analysis</Node>
            <Node>Screenshots</Node>
          </Branch>

          <Node variant="highlight">🛠 MVP</Node>
          <Branch>
            <Node>Features</Node>
            <Node>Wireframes</Node>
            <Node>Tasks</Node>
          </Branch>

          <Node>📣 Marketing</Node>
          <Branch>
            <Node>Messaging</Node>
            <Node>Assets</Node>
            <Node>Launch Plan</Node>
          </Branch>
        </Branch>
      </div>
      <div>
        <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
          The Secret Sauce.
        </span>
        <h2 className="text-3xl md:text-5xl leading-heading mt-4 font-display font-semibold text-espresso">
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
