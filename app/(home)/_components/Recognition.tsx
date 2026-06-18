import Image from "next/image";
import messyDesktopImg from "@/public/img/messy-desktop.jpg";
import chaosIcon from "@/public/img/chaos.svg";
import orderIcon from "@/public/img/order.svg";

export default function Recognition() {
  return (
    <section className="my-[90px]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 md:gap-[60px] items-center">
        <div>
          <h2 className="text-[32px] md:text-[48px] leading-heading mb-6 font-display font-semibold text-espresso">
            Does this look familiar?
          </h2>
          <p className="text-lg md:text-xl font-semibold mb-4 text-espresso">
            <span className="border-b-4 border-cinnamon pb-1">Somewhere in this pile</span> is the project.
          </p>
          <p className="text-lg leading-loose mb-8 text-espresso/90">
            The ideas. The decisions. The breakthroughs. The references you'll need later.
          </p>
          <hr className="border-t border-latte mb-7" />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-start gap-4 flex-1">
              <Image src={chaosIcon} alt="" width={44} height={44} className="flex-shrink-0" />
              <p className="text-lg leading-body text-espresso/90">
                The problem isn't that you have <span className="text-cinnamon font-semibold">too much information.</span>
              </p>
            </div>
            <div className="flex items-start gap-4 flex-1">
              <Image src={orderIcon} alt="" width={44} height={44} className="flex-shrink-0" />
              <p className="text-lg leading-body text-espresso/90">
                The problem is that the <span className="text-cinnamon font-semibold">context keeps getting lost</span>, and the best ideas are buried.
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={messyDesktopImg}
            alt="Cluttered desk with scattered notes and tabs"
            className="w-full h-full object-cover block"
            style={{ maskImage: "radial-gradient(ellipse 70% 70% at center, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, #000 55%, transparent 100%)" }}
          />
        </div>
      </div>
      <div className="bg-sand rounded-lg mt-12 md:mt-[50px] px-6 py-8 md:px-10 md:py-8 text-center">
        <p className="font-display italic text-xl md:text-[26px] text-cinnamon leading-subheading">
          Your project deserves better than twenty-seven tabs and endless folders.
        </p>
      </div>
    </section>
  );
}
