<template>
  <article class="tour-card">
    <div class="tour-card__cover-wrap">
      <img
          class="tour-card__cover"
          :src="coverSrc"
          :alt="product.title"
          loading="lazy"
          @error="onImgError"
      />
    </div>

    <div class="tour-card__body">
      <div class="tour-card__meta">
        <span class="tour-card__rating">
          <svg class="tour-card__star" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l1.3 3.9H11L8.2 7l1 3.9L6 8.8 2.7 11l1-3.9L1 4.9h3.7L6 1z" fill="#F5A623"/>
          </svg>
          <strong>{{ formatRating(product.customers_review_rating) }}</strong>
          <span class="tour-card__reviews">({{ product.reviews }})</span>
        </span>
        <span v-if="cityName" class="tour-card__city">{{ cityName }}</span>
      </div>

      <h3 class="tour-card__title">{{ product.title }}</h3>

      <p class="tour-card__price">от {{ parsedPrice }}&nbsp;₽</p>

      <p class="tour-card__type">за экскурсию</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types'

const props = defineProps<{
  product: Product
  cityName?: string
}>()

const coverSrc = computed(() => props.product.cover_photo?.big ?? '')

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ccc' font-size='14' font-family='sans-serif'%3EНет фото%3C/text%3E%3C/svg%3E`
  img.style.objectFit = 'contain'
}

function formatRating(r: number): string {
  return Number(r).toFixed(1)
}

const parsedPrice = computed(() => {
  const num = parseFloat(props.product.price?.replace(/[^\d.]/g, '') ?? '0')
  return isNaN(num) ? '—' : Math.round(num).toLocaleString('ru-RU')
})
</script>

<style scoped>
.tour-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tour-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.tour-card__cover-wrap {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f0f0f0;
}

.tour-card__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.tour-card:hover .tour-card__cover {
  transform: scale(1.04);
}

.tour-card__body {
  padding: 10px 0 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tour-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tour-card__rating {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: var(--font-body);
  font-size: 12px;
}

.tour-card__rating strong {
  color: #1a1a1a;
  font-weight: 600;
}

.tour-card__star {
  width: 12px;
  height: 12px;
}

.tour-card__reviews {
  color: #999;
  font-size: 11px;
}

.tour-card__city {
  font-size: 11px;
  color: #999;
}

.tour-card__title {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.35;
  margin: 2px 0 0;
}

.tour-card__price {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 4px 0 0;
}

.tour-card__type {
  font-family: var(--font-body);
  font-size: 11px;
  color: #999;
  margin: 0;
}
</style>