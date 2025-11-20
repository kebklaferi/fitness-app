import React, { useState } from 'react';
import { User, Calendar, Clock, Mail, Phone, Lock, CreditCard, Bell } from 'lucide-react';

// --- Reusable Component: ActionButton ---

const ActionButton = ({ label, variant, onClick }) => {
  let bgColor = '';
  let hoverBgColor = '';
  let textColor = '';

  switch (variant) {
    case 'primary':
      bgColor = 'bg-gray-800';
      hoverBgColor = 'hover:bg-gray-700';
      textColor = 'text-white';
      break;
    case 'secondary':
      bgColor = 'bg-gray-100';
      hoverBgColor = 'hover:bg-gray-200';
      textColor = 'text-gray-800';
      break;
    case 'danger':
      bgColor = 'bg-red-600';
      hoverBgColor = 'hover:bg-red-700';
      textColor = 'text-white';
      break;
    default:
        // Fallback for safety
        bgColor = 'bg-gray-500';
        hoverBgColor = 'hover:bg-gray-400';
        textColor = 'text-white';
  }

  return (
    <button
      className={`px-3 py-1 text-sm rounded transition-colors ${bgColor} ${hoverBgColor} ${textColor} font-semibold`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// --- Reusable Component: Training Card ---

const TrainingCard = ({ training }) => {
  const { title, trainer, date, time, status } = training;

  const handleCancel = () => console.log(`Cancelling: ${title}`);
  const handleRegister = () => console.log(`Registering: ${title}`);

  const statusDisplay = () => {
    if (status === 'Completed') {
      return (
        <span className="text-gray-600 text-sm font-semibold">Končano</span>
      );
    }
    // For 'Upcoming'
    return (
      <div className="flex space-x-2">
        <ActionButton label="Odjava" variant="danger" onClick={handleCancel} />
        <ActionButton label="Prijava" variant="primary" onClick={handleRegister} />
      </div>
    );
  };

  return (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0">
      <div className="flex flex-col">
        <p className="font-semibold text-gray-800">{title} z {trainer}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div>
        {statusDisplay()}
      </div>
    </div>
  );
};

// --- Main Component: MyProfile ---

const MyProfile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Mock Data based on the image
  const upcomingTrainings = [
    {
      type: 'Personal',
      title: 'Osebni trening',
      trainer: 'Ano Novak',
      date: 'November 1, 2025',
      time: '10:00',
      status: 'Upcoming',
    },
    {
      type: 'Group',
      title: 'Skupinska vadba - joga',
      trainer: 'Niko Novak',
      date: 'November 1, 2025',
      time: '06:00',
      status: 'Upcoming',
    },
  ];

  const completedTrainings = [
    {
      type: 'Completed',
      title: 'Osebni trening',
      trainer: 'Andrejem Novakom',
      date: 'Oktober 20, 2024',
      time: '05:00',
      status: 'Completed',
    },
    {
      type: 'Completed',
      title: 'Trening z xy',
      trainer: '',
      date: 'Oktober 18, 2024',
      time: '09:00',
      status: 'Completed',
    },
  ];

  // Placeholder action handlers
  const handleManageSubscription = () => console.log('Managing subscription...');
  const handleEditProfile = () => console.log('Editing profile...');
  const handleChangePassword = () => console.log('Changing password...');
  const handleEditPayment = () => console.log('Editing payment...');

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Left Column: Subscription and Training --- */}
        <div className="lg:w-2/3 space-y-8">
          
          {/* ## Active Subscription (Aktivna naročnina) */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <User size={20} className="mr-2" />
              Aktivna naročnina
            </h2>
            <p className="text-gray-500 mb-4">Tvoja aktivna naročnina.</p>

            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <h3 className="text-lg font-bold">Fitnes paket</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Obnovitev naročnine: **15. november 2025**
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-800">100.00€/mesec</span>
            </div>

            <button
              className="mt-6 w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              onClick={handleManageSubscription}
            >
              Upravljaj z naročnino
            </button>
          </div>
          
          <hr className="my-8" />
          
          {/* ## Reserved Trainings (Rezervirani treningi) */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <Calendar size={20} className="mr-2" />
              Rezervirani treningi
            </h2>
            <p className="text-gray-500 mb-4">Tvoji treningi</p>

            {/* Upcoming Trainings */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold mb-2">Prihajajoči (Upcoming)</h3>
              {upcomingTrainings.map((training, index) => (
                <TrainingCard key={index} training={training} />
              ))}
            </div>

            {/* Completed Trainings */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Končani (Completed)</h3>
              {completedTrainings.map((training, index) => (
                <TrainingCard key={index} training={training} />
              ))}
            </div>
            
          </div>

        </div>

        {/* --- Right Column: User Info and Settings --- */}
        <div className="lg:w-1/3 space-y-8">
          
          {/* ## User Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            {/* Placeholder for the blue/green circle avatar */}
            <div className="relative w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={48} />
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <h2 className="text-xl font-bold text-gray-800">Ime Priimek</h2>
            <p className="text-sm text-gray-500 mb-4">ID</p>

            <button
              className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors py-2 px-4 rounded-full border border-gray-300"
              onClick={handleEditProfile}
            >
              <User size={16} className="mr-2" />
              Uredi Profil
            </button>

            <div className="w-full mt-4 pt-4 border-t border-gray-200 text-sm space-y-3">
              <p className="flex justify-between items-center text-gray-700">
                <Mail size={16} className="mr-2 inline" />
                <span>email</span>
              </p>
              <p className="flex justify-between items-center text-gray-700">
                <Phone size={16} className="mr-2 inline" />
                <span>031 456 789</span>
              </p>
              <p className="flex justify-between items-center text-gray-700 cursor-pointer hover:text-gray-900" onClick={handleChangePassword}>
                <Lock size={16} className="mr-2 inline" />
                <span>Spremeni geslo</span>
              </p>
              <p className="flex justify-between items-center text-gray-700 cursor-pointer hover:text-gray-900" onClick={handleEditPayment}>
                <CreditCard size={16} className="mr-2 inline" />
                <span>Uredi plačila</span>
              </p>
            </div>
          </div>
          
          {/* ## Notifications Toggle */}
          <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center text-gray-800">
              <Bell size={20} className="mr-2" />
              <span className="font-semibold">Notifikacije</span>
            </div>
            
            {/* Tailwind Switch/Toggle */}
            <label htmlFor="notification-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="notification-toggle"
                  className="sr-only"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <div className={`block w-10 h-6 rounded-full ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${notificationsEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;