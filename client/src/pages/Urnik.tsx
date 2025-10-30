import { useState } from "react";

const weekdays = ["PON", "TOR", "SRE", "ČET", "PET", "SOB", "NED"];
const hours = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

const sampleSlots = [
    { id: 1, day: "PON", start: "16:00", end: "17:30", name: "Joga" },
    { id: 2, day: "TOR", start: "17:00", end: "18:00", name: "Zumba" },
    { id: 3, day: "SRE", start: "18:00", end: "19:30", name: "CrossFit" },
    { id: 4, day: "ČET", start: "19:00", end: "20:00", name: "Spinning" },
    { id: 5, day: "PET", start: "08:00", end: "09:30", name: "Pilates" },
];

export default function Urnik() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState<typeof sampleSlots[0] | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Ta teden: Urnik skupinskih vadb
            </h1>

            <div className="flex justify-between items-center max-w-7xl mx-auto mb-4">
                <button
                    onClick={() => setWeekOffset((w) => w - 1)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    Prejšnji teden
                </button>
                <span className="font-semibold text-gray-700">Teden {weekOffset + 1}</span>
                <button
                    onClick={() => setWeekOffset((w) => w + 1)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    Naslednji teden
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-8">
                        <div className="border-b border-r border-gray-200 bg-gray-100 p-2"></div>
                        {weekdays.map((day) => (
                            <div
                                key={day}
                                className="border-b border-r border-gray-200 bg-gray-100 p-2 text-center font-semibold"
                            >
                                {day}
                            </div>
                        ))}

                        {hours.map((hour) => (
                            <>
                                <div
                                    key={hour + "-label"}
                                    className="border-b border-r border-gray-200 bg-gray-50 p-2 text-right font-medium"
                                >
                                    {hour}
                                </div>

                                {weekdays.map((day) => {
                                    const slot = sampleSlots.find((s) => s.day === day && s.start === hour);
                                    return (
                                        <div
                                            key={day + "-" + hour}
                                            className="border-b border-r border-gray-200 h-16 flex items-center justify-center"
                                        >
                                            {slot && (
                                                <div
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className="skupinska-vadba-termin bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg text-sm font-semibold text-center cursor-pointer hover:bg-indigo-200 transition"
                                                >
                                                    {slot.name} <br /> {slot.start} - {slot.end}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedSlot && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Blurred background overlay */}
                    <div
                        className="absolute inset-0 bg-opacity-20 backdrop-blur-sm"
                        onClick={() => setSelectedSlot(null)}
                    ></div>

                    {/* Modal box */}
                    <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-lg z-10">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Prijava na vadbo
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Ali se želite prijaviti na vadbo <strong>{selectedSlot.name}</strong> ({selectedSlot.start} - {selectedSlot.end})?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setSelectedSlot(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                Prekliči
                            </button>
                            <button
                                onClick={() => {
                                    alert(`Prijava za ${selectedSlot.name} uspešna!`);
                                    setSelectedSlot(null);
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Da
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
