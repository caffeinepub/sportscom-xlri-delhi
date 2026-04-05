import { Toaster } from "@/components/ui/sonner";
import { AboutSection } from "./components/AboutSection";
import { AdminGalleryPanel } from "./components/AdminGalleryPanel";
import { ContactSection } from "./components/ContactSection";
import { EventsSection } from "./components/EventsSection";
import { EventsThisYearSection } from "./components/EventsThisYearSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { TeamSection } from "./components/TeamSection";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useIsAdmin } from "./hooks/useQueries";

export default function App() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin } = useIsAdmin();

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsThisYearSection />
        <EventsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      {isAuthenticated && isAdmin && <AdminGalleryPanel />}
      <Toaster />
    </div>
  );
}
