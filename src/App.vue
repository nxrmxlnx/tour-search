<template>
  <div class="app">
    <header class="app__header">
      <AppLogo />
      <h1 class="app__title">Экскурсии по всему миру</h1>

      <div class="app__search-row">
        <SearchInput
          v-model="query"
          placeholder="Введите название экскурсии"
          class="app__search-input"
        />
        <CitySelect
          v-model="selectedCityId"
          :cities="cities"
          placeholder="Выбрать город"
          class="app__city-select"
        />
      </div>
    </header>

    <main class="app__main">
      <!-- Loading -->
      <div v-if="loading" class="app__state">
        <div class="app__spinner" aria-label="Загрузка...">
          <span></span><span></span><span></span>
        </div>
        <p>Загружаем экскурсии…</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="app__state app__state--error">
        <p>{{ error }}</p>
      </div>

      <!-- No results -->
      <div
        v-else-if="hasActiveFilters && filteredProducts.length === 0"
        class="app__state"
      >
        <p class="app__no-results">Поиск не дал результатов</p>
        <button class="app__btn" @click="resetFilters">Сбросить фильтры</button>
      </div>

      <!-- Cards grid -->
      <TransitionGroup
        v-else
        name="cards"
        tag="div"
        class="app__grid"
      >
        <TourCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :city-name="cityById(product.city_id)?.name"
        />
      </TransitionGroup>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppLogo from './components/AppLogo.vue'
import SearchInput from './components/SearchInput.vue'
import CitySelect from './components/CitySelect.vue'
import TourCard from './components/TourCard.vue'
import { useSearch } from './composables/useSearch'

const {
  cities,
  query,
  selectedCityId,
  loading,
  error,
  filteredProducts,
  hasActiveFilters,
  resetFilters,
  cityById,
} = useSearch()
</script>

<style>
/* Design tokens */
:root {
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-ui:   'Inter', system-ui, -apple-system, sans-serif;
  --color-bg:      #f7f7f7;
  --color-surface: #ffffff;
  --color-accent:  #1a8cff;
  --color-text:    #1a1a1a;
  --color-muted:   #888888;
  --color-border:  #e0e0e0;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.app__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 32px;
  gap: 12px;
}

.app__title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-align: center;
}

.app__search-row {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 560px;
}

.app__search-input {
  flex: 1 1 0;
  min-width: 0;
}

.app__city-select {
  flex: 0 0 180px;
}

.app__main {
  margin-top: 8px;
}

.app__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px 0;
  color: var(--color-muted);
  font-size: 15px;
}

.app__state--error {
  color: #d44;
}

.app__no-results {
  font-size: 16px;
  color: var(--color-muted);
}

.app__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.app__btn:hover { background: #0a7aee; }
.app__btn:active { transform: scale(0.97); }

.app__spinner {
  display: flex;
  gap: 6px;
}

.app__spinner span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: bounce 0.9s ease-in-out infinite;
}

.app__spinner span:nth-child(2) { animation-delay: 0.15s; }
.app__spinner span:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%            { transform: translateY(-8px); opacity: 1; }
}

.app__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.cards-enter-active,
.cards-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.cards-enter-from { opacity: 0; transform: translateY(10px); }
.cards-leave-to   { opacity: 0; transform: scale(0.95); }
.cards-move       { transition: transform 0.3s; }

@media (max-width: 720px) {
  .app__grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .app__city-select { flex: 0 0 140px; }
}

@media (max-width: 480px) {
  .app__search-row { flex-direction: column; }
  .app__city-select { flex: unset; }
  .app__grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .cards-enter-active,
  .cards-leave-active,
  .cards-move { transition: none; }
}
</style>
