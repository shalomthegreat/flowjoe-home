import Image from "next/image";
import screenshotImg from "@/public/img/screenshot.jpg";

export default function AppShot() {
  return (
    <Image
      src={screenshotImg}
      alt="FlowJoe application screenshot"
      className="block w-full h-auto rounded-lg border border-latte shadow-soft my-24"
    />
  );
}
