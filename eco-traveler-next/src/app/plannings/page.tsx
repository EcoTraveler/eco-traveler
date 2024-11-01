import Navbar from "@/components/Navbar";
import { PlanningList } from "./planning-list";
import Footer from "@/components/Footer";

export default function PlanningsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Eco Travel Plannings</h1>
        <PlanningList />
      </div>
      <Footer />
    </>
  );
}
