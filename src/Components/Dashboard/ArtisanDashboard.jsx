// import React from 'react'



// const Values=()=> {
 

//   return (
//     <div className='mb-[4rem] mt-[6rem]'>
//       <h1 className='text-textColor text-[22px] py-[2rem] pb-[3rem] font-bold block'>
//         404
//       </h1>
//       <h4>Artisan's Dashboard</h4>
     
//     </div>
//   )
// }

// export default Values
import React, { useState } from 'react'
import { Bell, Briefcase as BriefcaseCheck, Clock, DollarSign, LogOut, MessageSquare, Users, X } from 'lucide-react';

// Mock data 
const mockData = {
  user: { name: 'John Smith' },
  stats: {
    completedJobs: 0,
    uncompletedJobs: 0,
    pendingRequests: 0,
    totalEarnings: 0,
    totalClients: 0,
  },
  notifications: [
    { id: 1, message: 'New job request from Sarah M.', time: '2 hours ago' },
    { id: 2, message: 'Payment received for Project #123', time: '5 hours ago' },
    { id: 3, message: 'Client feedback received', time: '1 day ago' },
  ],
};

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function App() {
  const [showNotifications, setShowNotifications] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleLogout = () => {
   
   alert('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Artisan's Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Bell size={24} />
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {mockData.notifications.length}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {mockData.user.name}!
          </h2>
          <p className="text-gray-600 mt-1"> How are you today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={BriefcaseCheck}
            title="Completed Jobs"
            value={mockData.stats.completedJobs}
            color="bg-green-500"
          />
          <StatCard
            icon={Clock}
            title="Uncompleted Jobs"
            value={mockData.stats.uncompletedJobs}
            color="bg-yellow-500"
          />
          <StatCard
            icon={MessageSquare}
            title="Pending Requests"
            value={mockData.stats.pendingRequests}
            color="bg-blue-500"
          />
          <StatCard
            icon={DollarSign}
            title="Total Earnings"
            value={formatCurrency(mockData.stats.totalEarnings)}
            color="bg-purple-500"
          />
          <StatCard
            icon={Users}
            title="Total Clients"
            value={mockData.stats.totalClients}
            color="bg-indigo-500"
          />
        </div>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                {mockData.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="py-3 border-b last:border-0"
                  >
                    <p className="text-gray-800">{notification.message}</p>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
