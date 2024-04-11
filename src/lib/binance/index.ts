import { writable } from 'svelte/store'
import data from '../../data/pairs-crypto.yml'

export interface CryptoPairs {
  name: string
  pair: string
  description: string
  prefix: string
}

export interface PriceData {
  value: string
  direction: 'up' | 'down' | ''
}

export const cryptoPairs = data as CryptoPairs[]

const loading = '...'
export const prices = writable<Record<string, PriceData>>({})

cryptoPairs.forEach((pair) =>
  prices.update((n) => ({ ...n, [pair.pair]: { value: loading, direction: '' } }))
)

export function initializePrices() {
  const binanceWsUrl = 'wss://stream.binance.com:9443/ws/'
  const connections = cryptoPairs.map((pair) => {
    const connection = new WebSocket(`${binanceWsUrl}${pair.pair.toLowerCase()}@trade`)

    connection.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const newValue = parseFloat(data.p).toFixed(2)
      prices.update((n) => {
        const currentPrice = n[pair.pair]
        let direction: 'up' | 'down' | '' = ''
        if (currentPrice.value !== loading) {
          direction = newValue > currentPrice.value ? 'up' : 'down'
        }
        return { ...n, [pair.pair]: { value: newValue, direction } }
      })
    }

    return connection
  })

  return () => {
    connections.forEach((conn) => conn.close())
  }
}
