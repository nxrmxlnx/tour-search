<template>
  <div class="city-select" ref="rootRef">
    <button
      class="city-select__trigger"
      :class="{ 'city-select__trigger--active': isOpen }"
      type="button"
      @click="isOpen = !isOpen"
    >
      <span class="city-select__value" :class="{ 'city-select__value--placeholder': !modelValue }">
        {{ selectedLabel }}
      </span>
      <svg class="city-select__arrow" :class="{ 'city-select__arrow--open': isOpen }"
        viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="city-select__dropdown">
        <button
          class="city-select__option city-select__option--reset"
          type="button"
          @click="select(null)"
        >
          Все города
        </button>
        <button
          v-for="city in cities"
          :key="city.id"
          class="city-select__option"
          :class="{ 'city-select__option--selected': modelValue === city.id }"
          type="button"
          @click="select(city.id)"
        >
          {{ city.name }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { City } from '../types'

const props = defineProps<{
  modelValue: number | null
  cities: City[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (!props.modelValue) return props.placeholder ?? 'Выбрать город'
  return props.cities.find(c => c.id === props.modelValue)?.name ?? 'Выбрать город'
})

function select(id: number | null) {
  emit('update:modelValue', id)
  isOpen.value = false
}

function handleOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleOutside))
</script>

<style scoped>
.city-select {
  position: relative;
  user-select: none;
}

.city-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.city-select__trigger--active {
  border-color: #1a8cff;
}

.city-select__value {
  font-family: var(--font-body);
  font-size: 14px;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.city-select__value--placeholder {
  color: #b0b0b0;
}

.city-select__arrow {
  width: 10px;
  height: 6px;
  flex-shrink: 0;
  color: #999;
  transition: transform 0.2s;
}

.city-select__arrow--open {
  transform: rotate(180deg);
}

.city-select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 260px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.city-select__option {
  display: block;
  width: 100%;
  padding: 10px 14px;
  text-align: left;
  font-family: var(--font-body);
  font-size: 14px;
  color: #1a1a1a;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}

.city-select__option:hover {
  background: #f5f5f5;
}

.city-select__option--selected {
  color: #1a8cff;
  font-weight: 600;
}

.city-select__option--reset {
  color: #888;
  border-bottom: 1px solid #f0f0f0;
  font-style: italic;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
