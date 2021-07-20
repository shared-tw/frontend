<template>
  <TheHeader v-show="!$route.params.org" />
  <router-view />
  <FlashMessage />
</template>
