import React from "react";
import { Users, ShoppingBag, Heart, Globe, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const team = [
    { name: "Dhruv Gharat", role: "Frontend Developer" },
    { name: "Madhura Tandel", role: "Frontend Developer" },
    { name: "Bhumika Bhoir", role: "Backend Developer" },
    { name: "Prince Panchal", role: "Backend Developer" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="absolute inset-0">
          <img
            src="images/artisanweaving.jpg"
            alt="About Bunai"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-6 py-28 text-center">
          <button
            onClick={onBack}
            className="absolute left-6 top-6 text-white hover:text-gray-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            About Bunai
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Empowering artisans and tribal creators by weaving tradition with
            technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition">
          <ShoppingBag className="w-12 h-12 mx-auto text-red-800 mb-4" />
          <h3 className="text-xl font-bold mb-3">Marketplace</h3>
          <p className="text-gray-600 leading-relaxed">
            A seamless platform for authentic tribal and handmade products,
            helping artisans connect with buyers.
          </p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition">
          <Heart className="w-12 h-12 mx-auto text-red-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Impact</h3>
          <p className="text-gray-600 leading-relaxed">
            Every purchase supports sustainable livelihoods and preserves
            cultural traditions.
          </p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition">
          <Globe className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Global Reach</h3>
          <p className="text-gray-600 leading-relaxed">
            Bunai connects local artisans to the world, creating opportunities
            beyond boundaries.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 flex items-center justify-center gap-2 text-red-900">
            <Users className="w-8 h-8" /> Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="w-64 p-8 bg-stone-50 rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xl font-bold">
                  {member.name[0]}
                </div>
                <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
