import { useState } from "react";

export default function Kalkulator() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintenance");
  const [proteinRange, setProteinRange] = useState<{ min: number; max: number } | null>(null);

  const activityMultipliers: Record<string, number> = {
    sedentary: 0.8,
    moderate: 1.2,
    active: 1.6,
    intense: 2.0,
  };

  const calculateProtein = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || w <= 0) return alert("Vnesite veljavno težo!");
    if (!h || h <= 0) return alert("Vnesite veljavno višino!");
    if (!a || a <= 0) return alert("Vnesite veljavno starost!");

    const weightKg = unit === "lb" ? w * 0.453592 : w;
    let multiplier = activityMultipliers[activity];

    if (goal === "muscle") multiplier += 0.3;
    else if (goal === "fat-loss") multiplier += 0.1;

    if (a >= 60) multiplier += 0.2;
    if (gender === "male") multiplier += 0.1;

    const protein = weightKg * multiplier;
    setProteinRange({ min: protein * 0.9, max: protein * 1.1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6 flex flex-col items-center">
      {/* Hero / Title */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Proteinski kalkulator
        </h1>
        <p className="text-gray-600 text-lg">
          Izračunajte svojo dnevno potrebo po beljakovinah glede na težo, starost, spol, aktivnost in cilj.
        </p>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weight + Unit */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-semibold">Teža</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Vnesite težo"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "kg" | "lb")}
              className="border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        {/* Height */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-semibold">Višina (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Vnesite višino"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-semibold">Starost</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Vnesite starost"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-semibold">Spol</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="male">Moški</option>
            <option value="female">Ženska</option>
          </select>
        </div>

        {/* Activity */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-semibold">Raven aktivnosti</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="sedentary">Seden življenjski slog</option>
            <option value="moderate">Zmerna aktivnost</option>
            <option value="active">Aktiven</option>
            <option value="intense">Intenzivna vadba</option>
          </select>
        </div>

        {/* Goal */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 font-semibold">Cilj</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="maintenance">Vzdrževanje teže</option>
            <option value="muscle">Pridobivanje mišične mase</option>
            <option value="fat-loss">Izguba maščobe</option>
          </select>
        </div>

        {/* Calculate Button - spans two columns */}
        <div className="md:col-span-2">
          <button
            onClick={calculateProtein}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition"
          >
            Izračunaj
          </button>
        </div>
      </div>

      {/* Result */}
      {proteinRange && (
        <div className="mt-10 bg-indigo-50 rounded-3xl p-8 max-w-4xl w-full text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Priporočena dnevna količina beljakovin
          </h3>
          <p className="text-gray-700 mb-4">
            Glede na vaše podatke:
          </p>
          <span className="text-4xl font-extrabold text-indigo-600">
            {proteinRange.min.toFixed(1)} g – {proteinRange.max.toFixed(1)} g
          </span>
        </div>
      )}
    </div>
  );
}
