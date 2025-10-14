import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import AISearch from "./AISearch";

const heroImages = [
  "https://drive.google.com/thumbnail?id=1VWB4BI4124_T9eZvQ8XMhq0dG2oNkhtp&sz=w2000",
  "https://drive.google.com/thumbnail?id=1aEVNEMtcF3v-qL90sE7Em2fpw9waXBFq&sz=w2000",
  "https://drive.google.com/thumbnail?id=19G3vh08_3Po29UQNa5X6dBvK0tG3dhcH&sz=w2000",
  "https://drive.google.com/thumbnail?id=1MtqK-7ggbOkxDRdXDj4nQnWz7OfD4sFi&sz=w2000",
  "https://drive.google.com/thumbnail?id=1iNd_BCSikdZvMnWgrXs2B_YK8_k8s8Wy&sz=w2000",
  "https://drive.google.com/thumbnail?id=15NN2jglLnvw8EW8qEALCrFixAyvyzDAM&sz=w2000",
  "https://drive.google.com/thumbnail?id=1Aaf12acvoavRHcwOJHGxcjYTX7f1tT2K&sz=w2000",
  "https://drive.google.com/thumbnail?id=1IvsztZsgptwTBsuvMqkaqdJkTUqhPNbA&sz=w2000",
];

export default function Hero() {
  // Logic for animating slides
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      if (index === currentSlide || isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
    },
    [currentSlide, isTransitioning]
  );

  useEffect(() => {
    let transitionTimeout;
    if (isTransitioning) {
      transitionTimeout = setTimeout(() => setIsTransitioning(false), 500);
    }
    return () => clearTimeout(transitionTimeout);
  }, [isTransitioning]);

  useEffect(() => {
    let intervalId;
    if (!isTransitioning) {
      intervalId = setInterval(() => {
        const nextSlide = (currentSlide + 1) % heroImages.length;
        goToSlide(nextSlide);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [currentSlide, isTransitioning, goToSlide]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Hey");
  };

  return (
    <div className="relative h-[630px] md:h-[640px] lg:h-[650px] py-3 mx-4 overflow-hidden rounded-3xl bg-black z-0">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div key={index} className={cn("absolute inset-0 bg-cover bg-center transition-opacity duration-500", currentSlide === index ? "opacity-100" : "opacity-0")} style={{ backgroundImage: `url(${image})` }}>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-white justify-center h-full px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">Find Your Best Staycation</h1>
        <p className="text-base md:text-lg mb-8 text-center max-w-2xl">Describe your dream destination and experience, and we'll find the perfect place for you.</p>

        {/* Search Form */}
        <AISearch />

        {/* Pagination dots */}
        <div className="absolute bottom-6 flex space-x-3">
          {heroImages.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={cn("h-3 transition-all rounded-full", currentSlide === index ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/70")} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
