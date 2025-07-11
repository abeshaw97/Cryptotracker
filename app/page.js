'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
const [search,setSearch] =useState('')
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        )
        setCoins(res.data)
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <main className="min-h-screen bg-teal-100 text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Top 10 Cryptocurrencies</h1>

      <input
      type="text"
placeholder="search coins..."
value={search}
onChange={(e)=> setSearch(e.target.value)}
className="w-full p-2 mb-6 border rounded-md"
/>
<div className="grid gap-4 sm:grid-cols-2">
  
  {coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((coin) => (
      <div key={coin.id} className="border p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h2>
          <img src={coin.image} alt={coin.name} className="w-6 h-6" />
        </div>
        <p>💵 ${coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0
              ? 'text-green-600'
              : 'text-red-600'
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    ))}
</div>
</main>
  )}
