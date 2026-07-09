import Image from "next/image";
import editIcon from "@/public/img/edit.svg";
import connectIcon from "@/public/img/connect.svg";
import clipboardIcon from "@/public/img/clipboard.svg";
import wandIcon from "@/public/img/wand.svg";
import privateIcon from "@/public/img/private.svg";

const features = [
  { icon: editIcon, title: "Capture anything", text: "Notes, links, files, images, audio, and more. Jot it down and don't lose it." },
  { icon: connectIcon, title: "Connect ideas", text: "Visually link concepts and see the big picture emerge." },
  { icon: clipboardIcon, title: "Track progress", text: "Tasks, checklists, and status that keep you organized, without boxing you in." },
  { icon: wandIcon, title: "AI with training", text: "Get insights and suggestions with full context, never starting from scratch." },
  { icon: privateIcon, title: "Yours, always", text: "Local-first by design. Your data stays yours, and never hits our servers." },
];

export default function FeatureStrip() {
  return (
    <section className="bg-cream-soft border border-latte rounded-lg p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 my-24">
      {features.map((f) => (
        <div key={f.title} className="text-center">
          <Image src={f.icon} alt="" width={56} height={56} className="mx-auto mb-3 block" />
          <h3 className="text-lg font-display font-semibold text-espresso mb-2">{f.title}</h3>
          <p className="text-sm text-espresso/90">{f.text}</p>
        </div>
      ))}
    </section>
  );
}
