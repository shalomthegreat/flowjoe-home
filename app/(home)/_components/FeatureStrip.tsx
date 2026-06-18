const features = [
  { icon: "/img/edit.svg", title: "Capture anything", text: "Notes, links, files, images, audio, and more. Jot it down and don't lose it." },
  { icon: "/img/connect.svg", title: "Connect ideas", text: "Visually link concepts and see the big picture emerge." },
  { icon: "/img/clipboard.svg", title: "Track progress", text: "Tasks, checklists, and status that keep you organized, without boxing you in." },
  { icon: "/img/wand.svg", title: "AI with training", text: "Get insights and suggestions with full context, never starting from scratch." },
  { icon: "/img/private.svg", title: "Yours, always", text: "Local-first by design. Your data stays yours, and never hits our servers." },
];

export default function FeatureStrip() {
  return (
    <section className="bg-cream-soft border border-latte rounded-lg p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 my-[90px]">
      {features.map((f) => (
        <div key={f.title} className="text-center">
          <img src={f.icon} alt="" className="w-14 h-14 mx-auto mb-3 block" />
          <h3 className="text-lg font-display font-semibold text-espresso mb-2">{f.title}</h3>
          <p className="text-[15px] text-espresso/90">{f.text}</p>
        </div>
      ))}
    </section>
  );
}
