<template>
  <div class="logo">
    <svg class="logo__bolt" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 0L0 10h5.5L5 18l9-10H8L8.5 0z" fill="#F5A623"/>
    </svg>
    <span class="logo__text">SPUTNIK</span>
  </div>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.logo__bolt {
  width: 14px;
  height: 18px;
}
.logo__text {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #1a1a1a;
}
</style>
