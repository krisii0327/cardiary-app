import Hero from "./components/layout/Hero";
import HomeGarage from "./components/layout/HomeGarage";
import SectionHeaders from "./components/layout/SectionHeaders";
import { BiSolidCarGarage } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionHeaders mainHeader={"CHECK OUT the"} subHeader={"GARAGE"} icon={<BiSolidCarGarage className="w-14 h-12"/>}/>
      <HomeGarage />
    </>
  )
}
