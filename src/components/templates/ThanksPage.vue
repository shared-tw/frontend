<template>
  <main class="flex flex-col items-center p-12">
    <uil:grin class="text-primary text-4xl" />
    <h1 class="font-bold text-2xl py-6">
      您的捐贈申請已送出
    </h1>
    <p class="text-center mb-18 whitespace-nowrap">
      請耐心等候確認<wbr>您也可以著手開始準備捐贈品項
    </p>
    <div class="flex flex-col items-center space-y-4">
      <AppLink to="/">
        查看捐贈紀錄
      </AppLink>
      <AppLink inline to="/" class="text-primary-dark no-underline hover:underline">
        返回首頁
      </AppLink>
    </div>
  </main>
</template>
