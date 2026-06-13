<template>
  <div class="search-input">
    <input
      class="search-input__field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      class="search-input__clear"
      type="button"
      aria-label="Очистить"
      @click="$emit('update:modelValue', '')"
    >
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style scoped>
.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input__field {
  width: 100%;
  height: 40px;
  padding: 0 36px 0 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 14px;
  color: #1a1a1a;
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
}

.search-input__field::placeholder {
  color: #b0b0b0;
}

.search-input__field:focus {
  border-color: #1a8cff;
}

.search-input__clear {
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.search-input__clear:hover {
  color: #333;
}

.search-input__clear svg {
  width: 10px;
  height: 10px;
}
</style>
