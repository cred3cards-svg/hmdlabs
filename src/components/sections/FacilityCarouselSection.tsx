"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const IMAGES = [
  "/images/indian_lab_tech_1_1774854541766.png",
  "/images/indian_lab_tech_2_1774854575689.png",
  "/images/indian_lab_tech_3_1774854598547.png",
];

export default function FacilityCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold font-display text-gray-900 sm:text-4xl">State-of-the-Art <span className="text-brand-700">Facilities</span></h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our centers are equipped with fully automated, FDA-approved analyzers operated by highly trained medical professionals, ensuring world-class accuracy constraint-free.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div 
            className="flex transition-transform duration-700 ease-in-out h-[400px] sm:h-[500px] md:h-[600px] w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {IMAGES.map((src, index) => (
              <div key={src} className="min-w-full h-full relative shrink-0">
                <Image
                  src={src}
                  alt={`State of the art automated analyzer facility image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-brand-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus:ring-4 focus:ring-brand-500/30 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-brand-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus:ring-4 focus:ring-brand-500/30 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 rounded-full bg-black/20 backdrop-blur-sm">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 focus:outline-none",
                  currentIndex === index ? "bg-white w-8" : "bg-white/60 hover:bg-white/90 w-2.5"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
