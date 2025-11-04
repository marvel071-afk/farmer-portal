import React from 'react'
export default function Dashboard(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-600">Simple dashboard with cards and quick actions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">My Listings</h3>
          <p className="text-sm text-gray-600">Manage your crop listings.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Profile</h3>
          <p className="text-sm text-gray-600">Update your profile & settings.</p>
        </div>
      </div>
    </div>
  )
}
