import {
    ArrowRight,
    Message,
    UserFilled,
    Lock,
    Iphone,
    Search,
    ShoppingCart,
    ShoppingCartFull,
    Close,
    ArrowLeft,
    Star,
    View,
    ChatLineSquare,
    ArrowDown,
    Medal,
    Setting,
    Location,
    SuccessFilled,Clock,SoldOut
} from '@element-plus/icons-vue'
import {
    ElIcon,
    ElMessage,
    ElCarousel
} from 'element-plus'


export default {
    install(App) {
        App.use(ElIcon)
        App.use(ElMessage)
        App.use(ElCarousel)
        App.component('SoldOut', SoldOut)
        App.component('Clock', Clock)
        App.component('SuccessFilled', SuccessFilled)
        App.component('Medal', Medal)
        App.component('Setting', Setting)
        App.component('Location', Location)
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