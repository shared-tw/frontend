<template>
  <NavigationHeader name="會員頁面" />
  <AppContainer class="py-4">
    <UserCard />
    <UserDonationStateLinks />
    <UserNotificationCenter />
    <UserLogoutButton />
  </AppContainer>
</template>

<route lang="yaml">
meta:
  hideHeader: true
</route>
