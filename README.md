# Sputnik Tour Search

Приложение для поиска экскурсий по названию и городу.

## Стек

- **Vue 3** + Composition API (`<script setup>`)
- **TypeScript**
- **Vite** (сборщик)
- Без UI-библиотек — всё написано с нуля

## Структура

```
src/
├── types/index.ts          # TypeScript-интерфейсы (Product, City)
├── api/index.ts            # Запросы к Sputnik8 API
├── composables/
│   └── useSearch.ts        # Вся логика поиска и фильтрации
└── components/
    ├── AppLogo.vue         # Логотип ⚡SPUTNIK
    ├── SearchInput.vue     # Поле ввода с кнопкой очистки
    ├── CitySelect.vue      # Кастомный дропдаун городов
    └── TourCard.vue        # Карточка экскурсии
```

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # продакшн-сборка
npm run preview    # превью сборки
```

## Реализовано

- Загрузка экскурсий и городов из Sputnik8 API
- Поиск по названию (title) + фильтр по городу (city_id)
- Кнопка очистки (×) в поле поиска
- Кнопка «Сбросить фильтры» при отсутствии результатов
- Нечёткий (fuzzy) поиск по символам
- Анимации карточек при фильтрации (TransitionGroup)
- Адаптивная вёрстка: 3 → 2 → 1 колонка
- prefers-reduced-motion поддержка
- TypeScript во всём проекте
