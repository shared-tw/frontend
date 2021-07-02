<template>
  <div class="grid gap-4 grid-cols-5">
    <div class="space-y-2">
      <AppTitle>
        Buttons
      </AppTitle>
      <div class="flex space-x-2">
        <AppButton>
          Button
        </AppButton>
        <AppButton outline>
          Button
        </AppButton>
      </div>
    </div>
    <div class="space-y-2">
      <AppTitle>
        Inputs
      </AppTitle>
      <AppCheckbox>
        Check
      </AppCheckbox>
      <FormCheckbox name="checkbox" label="Check" :disabled="true" />
      <AppInput />
    </div>
    <div class="space-y-2">
      <AppTitle>
        Label (Tag)
      </AppTitle>
      <div class="space-x-2">
        <AppLabel>
          Label
        </AppLabel>
        <AppLabel outline>
          Label
        </AppLabel>
      </div>
    </div>
    <div class="space-y-2">
      <AppTitle>
        Others
      </AppTitle>
      <div class="space-x-2">
        <AppLogo />
        <IconLoading :is-loading="true" />
        <AppAddMinusButton />
      </div>
    </div>
  </div>
</template>
