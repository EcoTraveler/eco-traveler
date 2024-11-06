import MyPlanList from "@/components/MyPlanList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyPlansPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 relative min-h-screen">
        <MyPlanList />
      </main>
      <Footer />
    </div>
  );
}
