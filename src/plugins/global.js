import Globaltit from '../globalCom/Globaltit.vue'
import GlobalShow from '../globalCom/GlobalShow.vue'
export default{
    install(App){
        App.component('Globaltit',Globaltit)
        App.component('GlobalShow',GlobalShow)
    }
}