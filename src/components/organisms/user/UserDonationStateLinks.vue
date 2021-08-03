<script setup lang="ts">

</script>

<template>
  <AppSection name="捐贈紀錄">
    <template #header>
      <CheckAllButton to="/" />
    </template>
    <div class="flex space-x-4">
      <DonationStateLink to="/user/donation?tab=await">
        <template #icon>
          <uil:heart-medical />
        </template>
        待確認
      </DonationStateLink>
      <DonationStateLink to="/user/donation?tab=await">
        <template #icon>
          <uil:comment-dots />
        </template>
        待出貨
      </DonationStateLink>
      <DonationStateLink to="/user/donation?tab=await">
        <template #icon>
          <uil:truck />
        </template>
        待收貨
      </DonationStateLink>
    </div>
  </AppSection>
</template>
