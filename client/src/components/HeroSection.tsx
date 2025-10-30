export default function HeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
        {/* Left side - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Dobrodošli v <span className="text-indigo-600">Wiifit</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
            Z Wiifit dosežite svoje cilje hitreje. Skupinske vadbe, osebno
            trenerstvo in orodja, ki vam pomagajo ostati na pravi poti — vse na
            enem mestu.
          </p>

          <div className="flex justify-center md:justify-start space-x-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium">
              Začni zdaj
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition font-medium">
              Izvedi več
            </button>
          </div>
        </div>

        {/* Right side - Placeholder for image or illustration */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
          <div className="w-80 h-80 bg-white rounded-2xl shadow-inner border border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 italic">
              (Slika ali ilustracija tukaj)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
