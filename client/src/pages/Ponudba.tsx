import { CheckCircle } from "lucide-react";
import Footer from "../components/Footer";
import PonudbaSection from "../components/PonudbaSection";
import HeroSection from "../components/HeroSection";

const Ponudba = () => {

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
            {/* ===== HERO / WELCOME SECTION ===== */}
           <HeroSection />

            {/* ===== PONUDBA SECTION ===== */}
            <PonudbaSection />
            {/* ===== SKUPINSKE VADBE SECTION ===== */}
            <section id="skupinske-vadbe" className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">Skupinske vadbe</h2>
                    <p className="text-gray-600 mb-12">
                        Odkrij naše skupinske vadbe, ki ti bodo pomagale doseči formo, motivacijo in zabavo v družbi.
                    </p>

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                id: 1,
                                name: "Joga",
                                description:
                                    "Umiri um in okrepi telo z našimi vodnimi joga urami za vse stopnje znanja.",
                                image: "/images/yoga.jpg",
                                schedule: [
                                    { day: "PON", time: "16:00 - 17:30" },
                                    { day: "SRE", time: "18:00 - 19:30" },
                                    { day: "PET", time: "08:00 - 09:30" },
                                ],
                            },
                            {
                                id: 2,
                                name: "Zumba",
                                description:
                                    "Energijska plesna vadba, ki združuje latino ritme in kardio trening.",
                                image: "/images/zumba.jpg",
                                schedule: [
                                    { day: "TOR", time: "17:00 - 18:00" },
                                    { day: "ČET", time: "19:00 - 20:00" },
                                    { day: "SOB", time: "10:00 - 11:00" },
                                ],
                            },
                            {
                                id: 3,
                                name: "CrossFit",
                                description:
                                    "Intenzivni trening moči in vzdržljivosti za napredne posameznike.",
                                image: "/images/crossfit.jpg",
                                schedule: [
                                    { day: "PON", time: "18:00 - 19:00" },
                                    { day: "SRE", time: "19:30 - 20:30" },
                                    { day: "PET", time: "17:00 - 18:00" },
                                ],
                            },
                            {
                                id: 4,
                                name: "Pilates",
                                description:
                                    "Krepitev stabilnosti, drže in prožnosti z vodeno vadbo pilatesa.",
                                image: "/images/pilates.jpg",
                                schedule: [
                                    { day: "TOR", time: "16:00 - 17:00" },
                                    { day: "ČET", time: "18:00 - 19:00" },
                                ],
                            },
                            {
                                id: 5,
                                name: "Spinning",
                                description:
                                    "Kolesarjenje v ritmu glasbe — odlično za izgubo kalorij in zabavo.",
                                image: "/images/spinning.jpg",
                                schedule: [
                                    { day: "PON", time: "17:30 - 18:30" },
                                    { day: "SRE", time: "17:00 - 18:00" },
                                    { day: "PET", time: "16:00 - 17:00" },
                                ],
                            },
                            {
                                id: 6,
                                name: "BodyPump",
                                description:
                                    "Vadba z utežmi, ki oblikuje telo in povečuje mišično vzdržljivost.",
                                image: "/images/bodypump.jpg",
                                schedule: [
                                    { day: "TOR", time: "19:00 - 20:00" },
                                    { day: "ČET", time: "17:00 - 18:00" },
                                    { day: "SOB", time: "09:00 - 10:00" },
                                ],
                            },
                        ].map((training) => (
                            <div
                                key={training.id}
                                className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
                            >
                                <img
                                    src={training.image}
                                    alt={training.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 text-left">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                        {training.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{training.description}</p>

                                    {/* Divider line above schedule */}
                                    <div className="border-t border-indigo-100 my-4"></div>

                                    {/* Schedule list (no title, just clean rows) */}
                                    <ul className="space-y-2 mb-6">
                                        {training.schedule.map((s, i) => (
                                            <li
                                                key={i}
                                                className="flex justify-between text-gray-700 text-sm sm:text-base"
                                            >
                                                <span className="font-medium">{s.day}</span>
                                                <span>{s.time}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex justify-center">
                                        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">
                                            Poglej urnik
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ===== OSEBNO TRENERSTVO SECTION ===== */}
            <section id="osebno-trenerstvo" className="py-20 px-6 bg-gray-50">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Main title */}
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">Osebno trenerstvo</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                        Naša individualna vadba je popolnoma prilagojena tvojim ciljem, tempu in življenjskemu slogu.
                        S pomočjo osebnega trenerja boš učinkovito napredoval, pridobil motivacijo in zgradil zdrave navade.
                    </p>

                    {/* Subtitle */}
                    <h3 className="text-2xl font-semibold mb-8 text-indigo-700">Tvoja pot, tvoj trener</h3>

                    {/* Features in two columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                        {[
                            "Popolnoma prilagojen program vadbe",
                            "Spremljanje napredka in svetovanje o prehrani",
                            "Motivacija in podpora na vsakem koraku",
                            "Poudarek na pravilni tehniki in varnosti",
                            "Možnost vadbe v paru ali individualno",
                            "Doseganje tvojih ciljev hitreje in učinkoviteje",
                        ].map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>{/* ===== CTA SECTION ===== */}
            <section
                id="cta"
                className="py-28 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center"
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                        Pripravljen_a na svojo preobrazbo?
                    </h2>
                    <p className="text-lg sm:text-xl mb-10">
                        Začni svojo fitnes pot danes in izkoristi vse naše programe, ki ti bodo pomagali doseči tvoje cilje.
                    </p>
                    <button className="bg-yellow-400 text-indigo-900 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-300 transition text-lg">
                        Pridruži se nam
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Ponudba;
