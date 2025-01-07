import { useState } from 'react';
import { Header } from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { Benefits } from "@/components/Benefits";
import { HowItWorks } from "@/components/HowItWorks";
import { PopularDestinations } from "@/components/PopularDestinations";
import { Testimonials } from "@/components/Testimonials";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Footer } from "@/components/Footer";
import { TestAPI } from '@/components/TestAPI';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Voyagez entre villes en toute sérénité
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Réservez votre taxi interurbain en quelques clics
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <Benefits />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-gradient-to-tr from-secondary/5 to-accent/5">
        <Testimonials />
      </section>

      {/* Footer */}
      <Footer />

      {/* Theme Switcher */}
      <ThemeSwitcher />

      <TestAPI />
    </div>
  );
};

export default Index;