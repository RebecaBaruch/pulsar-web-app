import SpecialistSidebar from "@/components/NavBar/SpecialistSidebar";
import NotificationBell from "@/components/NotificationBell";

export default function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
      <div className="flex flex-row lg:flex-col justify-between items-center w-full lg:w-64 bg-white shadow-sm lg:shadow-none flex-shrink-0">
        <SpecialistSidebar />
        <div className="lg:hidden px-4">
          <NotificationBell />
        </div>
      </div>
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-auto bg-white p-6 lg:p-16">
          {children} {/* APENAS ISSO vai alternar e carregar de forma nativa */}
        </main>
      </div>
    </div>
  );
}