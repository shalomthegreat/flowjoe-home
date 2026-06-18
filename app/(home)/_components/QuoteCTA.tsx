export default function QuoteCTA() {
  return (
    <div className="bg-sand rounded-md px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 my-[90px]">
      <p className="text-lg italic text-espresso/90 text-center md:text-left">
        &ldquo;Everything I need is connected, so I can focus on creating instead of searching.&rdquo;<br />
        <span className="not-italic font-medium">— Maya, Writer</span>
      </p>
      <a href="#" className="px-6 py-3 rounded-sm bg-espresso text-white font-medium border border-espresso whitespace-nowrap">
        Download FlowJoe
      </a>
    </div>
  );
}
