<template>
  <TheHeader v-show="!$route.meta.hideHeader" />
  <router-view />
  <FlashMessage />
</template>
