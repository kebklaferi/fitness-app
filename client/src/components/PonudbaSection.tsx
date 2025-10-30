import { Check } from "lucide-react";

export default function PonudbaSection() {
  const offers = [
    {
      title: "Osnovni Paket",
      description: "Za tiste, ki šele začenjate svojo fitness pot.",
      price: "29€ / mesec",
      features: [
        "2 skupinski vadbi na teden",
        "Dostop do osnovne opreme",
        "Spremljanje napredka",
      ],
      highlight: false,
    },
    {
      title: "Standard Paket",
      description: "Najbolj priljubljena izbira za redne obiskovalce.",
      price: "49€ / mesec",
      features: [
        "Neomejene skupinske vadbe",
        "Uporaba vse opreme",
        "Osebno svetovanje trenerja",
        "Dostop do prehranskih načrtov",
      ],
      highlight: true,
    },
    {
      title: "Premium Paket",
      description: "Za tiste, ki želijo popolno podporo in rezultate.",
      price: "79€ / mesec",
      features: [
        "Neomejene skupinske vadbe",
        "Osebni treningi 1-na-1",
        "Napredni prehranski načrti",
        "Spremljanje napredka z aplikacijo",
        "Prioritetni dostop do trenerjev",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Naša ponudba
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border transition-transform duration-300 ${
                offer.highlight
                  ? "border-indigo-600 scale-105"
                  : "border-gray-200 hover:scale-105"
              }`}
            >
              {offer.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm px-4 py-1 rounded-full shadow">
                  Najbolj priljubljeno
                </div>
              )}

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-6">{offer.description}</p>

                <div className="text-3xl font-bold text-indigo-600 mb-6">
                  {offer.price}
                </div>

                <ul className="space-y-3 text-left mb-8">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  offer.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                Izberi
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
