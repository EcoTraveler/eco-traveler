import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import MyPlanList from "@/components/MyPlanList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg font-semibold text-primary">Loading your plans...</p>
      </div>
    </div>
  );
}

export default function MyPlansPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <Suspense fallback={<LoadingSpinner />}>
            <MyPlanList />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
