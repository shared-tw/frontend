import { defineRule, configure } from 'vee-validate'
import { required, email, min, numeric, confirmed } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 導入驗證規則
defineRule('min', min)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('required', required)
defineRule('confirmed', confirmed)

// 新增語言（用於錯誤信息）
configure({
  generateMessage: localize('zh-tw', {
    messages: {
      ...zh_TW.messages,
      required: '此項目為必填',
    },
  }),
})

// 設定當前語言
setLocale('zh-tw')
