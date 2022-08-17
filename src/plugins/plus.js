import {
    ArrowRight,
    Message,
    UserFilled,
    Lock,
    Iphone,
    Search,
    ShoppingCart,
    ShoppingCartFull,Close,ArrowLeft,Star,View,ChatLineSquare,ArrowDown
} from '@element-plus/icons-vue'
import {
    ElIcon,
    ElMessage,ElCarousel
} from 'element-plus'


export default {
    install(App) {
        App.use(ElIcon)
        App.use(ElMessage)
        App.use(ElCarousel)
        App.component('Star', Star)
        App.component('ArrowDown', ArrowDown)
        App.component('View', View)
        App.component('ChatLineSquare', ChatLineSquare)
        App.component('ArrowLeft', ArrowLeft)
        App.component('ArrowRight', ArrowRight)
        App.component('Message', Message)
        App.component('UserFilled', UserFilled)
        App.component('Lock', Lock)
        App.component('Iphone', Iphone)
        App.component('Search', Search)
        App.component('ShoppingCart', ShoppingCart)
        App.component('ShoppingCartFull', ShoppingCartFull)
        App.component('Close', Close)
    }
}