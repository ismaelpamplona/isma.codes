import { writable } from 'svelte/store'

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

const loading = '...'
export const prices = writable<Record<string, PriceData>>({})

export function initializePrices(cryptoPairs: CryptoPairs[]) {
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

  return () => connections.forEach((conn) => conn.close())
}

// Fetch all symbols from Binance
async function fetchBinanceTickers(): Promise<string[]> {
  const url = 'https://api.binance.com/api/v3/exchangeInfo'
  const response = await fetch(url)
  const data = await response.json()

  const tickers = Array.from(
    new Set(data.symbols.map((item: { baseAsset: string }) => item.baseAsset))
  ) as string[]

  return tickers
}

export type CoinListObject = { [key: string]: { name: string; rank: number } }

async function fetchCoinpaprikaData(): Promise<CoinListObject> {
  const url = 'https://api.coinpaprika.com/v1/coins'
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)

  const symbolToName: CoinListObject = {}
  data.forEach(
    (coin: { symbol: string; name: string; is_active: boolean; rank: number; type: string }) => {
      if (coin.is_active && coin.rank < 1000) {
        symbolToName[coin.symbol.toUpperCase()] = {
          name: coin.name,
          rank: coin.rank
        }
      }
    }
  )

  return symbolToName
}

export async function getTickersFullData(): Promise<CoinListObject> {
  const binanceTickers = await fetchBinanceTickers()
  const symbolToName = await fetchCoinpaprikaData()

  const fullData: CoinListObject = {}
  binanceTickers.forEach((symbol) => {
    if (symbol in symbolToName)
      fullData[symbol] = {
        name: symbolToName[symbol].name,
        rank: symbolToName[symbol].rank
      }
  })

  return fullData
}
