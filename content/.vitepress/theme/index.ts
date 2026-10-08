import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomePage from './HomePage.vue'
import RecordSheet from './RecordSheet.vue'
import TopicGrid from './TopicGrid.vue'
import './style.css'
export default { extends: DefaultTheme, Layout, enhanceApp({app}) { app.component('HomePage', HomePage); app.component('RecordSheet', RecordSheet); app.component('TopicGrid', TopicGrid) } }
