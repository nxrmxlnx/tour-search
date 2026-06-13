import { ref, computed, onMounted } from 'vue'
import { fetchProducts, fetchCities } from '../api'
import type { Product, City } from '../types'

function fuzzyMatch(haystack: string, needle: string): boolean {
  if (!needle) return true
  const h = haystack.toLowerCase()
  const n = needle.toLowerCase()
  let hi = 0
  for (let ni = 0; ni < n.length; ni++) {
    const found = h.indexOf(n[ni], hi)
    if (found === -1) return false
    hi = found + 1
  }
  return true
}

export function useSearch() {
  const products = ref<Product[]>([])
  const cities = ref<City[]>([])
  const query = ref('')
  const selectedCityId = ref<number | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      const [p, c] = await Promise.all([fetchProducts(), fetchCities()])
      products.value = p
      cities.value = c
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка загрузки'
    } finally {
      loading.value = false
    }
  })

  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      const matchesQuery = !query.value || fuzzyMatch(p.title, query.value)
      const matchesCity = !selectedCityId.value || p.city_id === selectedCityId.value
      return matchesQuery && matchesCity
    })
  })

  const hasActiveFilters = computed(() =>
    query.value.length > 0 || selectedCityId.value !== null
  )

  function resetFilters() {
    query.value = ''
    selectedCityId.value = null
  }

  function cityById(id: number): City | undefined {
    return cities.value.find(c => c.id === id)
  }

  return {
    products,
    cities,
    query,
    selectedCityId,
    loading,
    error,
    filteredProducts,
    hasActiveFilters,
    resetFilters,
    cityById,
  }
}
