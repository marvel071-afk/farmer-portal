import React from 'react'
export default function Home(){
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome to KisaanConnect</h1>
        <p className="text-gray-600">Modern tools for farmers and buyers.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Marketplace</h3>
          <p className="text-sm text-gray-600">Buy and sell crops easily.</p>
        </div>
        <div className="card p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Weather</h3>
          <p className="text-sm text-gray-600">Local weather & advisories.</p>
        </div>
        <div className="card p-4 bg-white rounded shadow">
          <h3 className="font-semibold">News</h3>
          <p className="text-sm text-gray-600">Latest agriculture news.</p>
        </div>
      </section>
    </div>
  )
}
