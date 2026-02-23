import { Navbar } from "@/componets/common/ui/navbar";
import { HeroSection } from "@/componets/erp/customers/landing/section1";
import { Section2 } from "@/componets/erp/customers/landing/section2";
import { Section3 } from "@/componets/erp/customers/landing/section3";
import { Section5 } from "@/componets/erp/customers/landing/section5";
import { Section6 } from "@/componets/erp/customers/landing/section6";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Section2 />
      <Section3 />
      <Section5 />
      <Section6 />
    </>
  );
}
