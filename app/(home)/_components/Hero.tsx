import Image from "next/image";
import flowjoeImg from "@/public/img/flowjoe.jpg";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-10 pb-2">
      <div>
        <span className="inline-block bg-sand-deep px-4 py-2 rounded-full text-xs tracking-widest uppercase">
          Turn your next idea into a flow
        </span>
        <h1 className="text-[48px] md:text-[78px] leading-heading mt-5 mb-5 font-display font-semibold text-espresso">
          Where projects take shape.
        </h1>
        <p className="text-lg md:text-2xl leading-body max-w-[520px] text-espresso">
          FlowJoe is a visual workspace for makers, managers, and creatives to capture ideas, connect the pieces, and keep projects moving without losing the thread.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <a href="#" className="px-6 py-4 rounded-sm bg-espresso text-white font-medium border border-espresso">
            Download Free
          </a>
          <a href="#" className="px-6 py-4 rounded-sm border border-mocha text-espresso font-medium">
            Watch Demo
          </a>
        </div>
        <p className="text-[15px] italic text-cinnamon mt-4">
          Local-first. Works offline. Your data (and ideas) stay yours.
        </p>
      </div>
      <Image
        src={flowjoeImg}
        alt="FlowJoe — stay in the flow"
        className="w-full h-auto rounded-lg shadow-soft"
      />
    </section>
  );
}
