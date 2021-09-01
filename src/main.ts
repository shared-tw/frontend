import 'vue-global-api'

import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'

// css
import 'virtual:windi.css'
import './style/vars.css'
import './style/main.css'

// plugins
import './plugins/vee-validate'

const app = createApp(App)

app.use(router)
app.mount('#app')
