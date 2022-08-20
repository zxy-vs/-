import {
    defineStore
} from 'pinia'
import {
    reactive,
    ref
} from 'vue'

export const useTxtStore = defineStore('useTxt', () => {
        const usetxt = ref('')
        const hometxt = ref({})
        const list = ref([])
        const indress = ref(0)
        const showss = ref(false)
        const getCart = () => {
            if (localStorage.getItem('token')) {
                axios.get("/api/member/cart").then((res) => {
                        list.value = res.result;
                    })
                    .catch((err) => {
                        ElMessage.error('登录过期了请重新登录')
                        localStorage.removeItem('token')
                        usetxt.value = {}
                        list.value=[]
                    })
            }
        }
        return {
            usetxt,
            hometxt,
            list,
            getCart,indress,showss
        }
    }
    , {
        persist: true,
    }
)