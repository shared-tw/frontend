<template>
  <AuthLayout>
    <AppTitle>
      {{ $route.path.endsWith('organization') ? '機構登入' : '登入' }}
    </AppTitle>
    <slot />
  </AuthLayout>
</template>
