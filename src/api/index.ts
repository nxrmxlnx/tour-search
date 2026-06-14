import type { Product, City } from '../types'

const BASE = '/api'
const PARAMS = 'api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com'

async function apiFetch(path: string) {
  const res = await fetch(`${BASE}${path}?${PARAMS}`)
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json()
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await apiFetch('/products')
  return Array.isArray(data) ? data : (data.products ?? data)
}

export async function fetchCities(): Promise<City[]> {
  const data = await apiFetch('/cities')
  return Array.isArray(data) ? data : (data.cities ?? data)
}