import Hero from "@/components/home/Hero";
import HotelsView from "@/components/home/HotelsView";

function HomePage() {
  return (
    <main>
      <div className="relative min-h-[85vh]">
        <Hero />
      </div>
      <HotelsView />
    </main>
  );
}

export default HomePage;
