import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Marketplace(){
  const [crops, setCrops] = useState([])
  useEffect(()=>{
    axios.get('/api/crops').then(r=>setCrops(r.data)).catch(e=>console.error(e))
  },[])
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {crops.map(c=>(
          <div key={c.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            <p className="mt-2"><strong>Price:</strong> {c.price}</p>
            <p><strong>Qty:</strong> {c.quantity}</p>
            <p><strong>Location:</strong> {c.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
