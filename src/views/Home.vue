<template>
  <div class="header">
    <ul class="head-content">
      <li>
        <router-link to="/member" v-if="usetxt.token" class="one">
          <el-icon><UserFilled /></el-icon>
          {{ usetxt.account }}
        </router-link>
      </li>
      <li>
        <a href="javascript:;" v-if="usetxt.token" @click="esc"> 退出登录 </a>
      </li>
      <li v-for="(item, index) of hlist" :key="index">
        <router-link
          v-if="index == 0 && !usetxt.token"
          :to="item.path"
          :class="index == 0 ? 'one' : ''"
        >
          {{ item.name }}
        </router-link>
        <a href="javascript:;" v-if="index == 1 && !usetxt.token">
          <el-icon v-if="index == hlist.length - 1"><Iphone /></el-icon>
          {{ item.name }}
        </a>
        <router-link :to="item.path" v-if="index != 1 && index != 0">
          <el-icon v-if="index == hlist.length - 1"><Iphone /></el-icon>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
  <div class="sticky" ref="sticky">
    <div class="container">
      <router-link to="/" class="logo"> </router-link>
      <ul v-if="hometxt.length">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li
          v-for="(item, index) of hometxt"
          :key="item.id"
          @mouseenter="Showss(index)"
          @mouseleave="isShows = false"
        >
          <router-link
            :to="'/category/' + item.id"
            :class="
              route.path == `/category/${item.id}` ||
              (isShows && indexs == index)
                ? 'active'
                : ''
            "
            >{{ item.name }}</router-link
          >
        </li>
      </ul>
      <div class="mains" v-if="indexs <= 8">
        <Section
          class="pos"
          :list="nav[indexs]['children']"
          :isShow="isShows"
          @show="(boo) => (isShows = boo)"
        />
      </div>
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
  <nav>
    <div class="contain">
      <router-link to="/" class="logo"> </router-link>
      <ul class="nav">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li
          v-for="(item, index) of nav"
          :key="index"
          @mouseenter="shows(index)"
          @mouseleave="isShow = false"
        >
          <router-link
            :class="
              route.path == `/category/${item.id}` ||
              (isShow && indexs == index)
                ? 'active'
                : ''
            "
            :to="'/category/' + item.id"
            >{{ item.name }}</router-link
          >
        </li>
      </ul>

      <div class="search">
        <el-input
          v-model="search"
          placeholder="搜索"
          clearable
          prefix-icon="Search"
        />
      </div>
      <div class="cart">
        <router-link to="/cart">
          <el-badge :value="num ? num : ''" class="item">
            <el-icon size="28px" v-show="num > 0"><ShoppingCartFull /></el-icon>
          </el-badge>
          <el-icon size="28px" v-show="num <= 0"><ShoppingCart /></el-icon>
        </router-link>
        <div class="esShop" v-show="num > 0">
          <keep-alive>
            <EsShop :fn="fn" />
          </keep-alive>
        </div>
      </div>
      <div class="mains" v-if="indexs <= 8">
        <Section
          :list="nav[indexs]['children']"
          :isShow="isShow"
          @show="(boo) => (isShow = boo)"
        />
      </div>
    </div>
    <div class="bg">
      <router-view v-show="route.path != '/'"></router-view>
    </div>
    <HomeCom v-show="route.path == '/'" />
  </nav>
  <div class="foot"></div>
 
</template>
<script>
import { onMounted, reactive, ref, toRefs } from "vue-demi";
import { useTxtStore } from "../store/useStore";
import { storeToRefs } from "pinia";
import EsShop from "../components/home/EsShop.vue";
import { useRoute } from "vue-router";
import HomeCom from "../components/home/HomeCom.vue";
import Section from "../components/home/Section.vue";
export default {
  setup() {
    const usetxtStore = useTxtStore();
    const route = useRoute();
    const { usetxt, hometxt, list} = storeToRefs(usetxtStore);
    const sticky = ref();
    const time = ref();
    const home = reactive({
      hlist: [
        { name: "请先登录", path: "/login" },
        { name: "免费注册", path: "/" },
        { name: "我的订单", path: "/member/order" },
        { name: "会员中心", path: "/" },
        { name: "帮助中心", path: "/" },
        { name: "关于我们", path: "/" },
        { name: "手机版", path: "/" },
      ],
      nav: [],
      search: "",
      num: 0,
      indexs: 9,
      isShow: false,
      isShows: false,
      esc() {
        localStorage.removeItem("token");
        usetxt.value = {};
        list.value = [];
      },
      async getnav() {
        let { result } = await axios.get("/api/home/category/head");
        this.nav = result;
        hometxt.value = result;
      },
      fn(num) {
        home.num = num;
      },
      shows(index) {
        this.indexs = index;
        this.isShow = true;
      },
      Showss(index) {
        this.indexs = index;
        this.isShows = true;
      },
    });
    home.getnav();
    onMounted(() => {
      window.onscroll = function () {
        if (route.path != "/login") {
          if (document.documentElement.scrollTop > 80) {
            sticky.value.className = "sticky show";
          } else {
            sticky.value.className = "sticky";
          }
        }
      };
    });
    
    return {
      ...toRefs(home),
      usetxt,
      route,
      hometxt,
      sticky
    };
  },
  components: { EsShop, HomeCom, Section },
};
</script>

<style lang="less" scoped>
.header {
  background: #333;
  .head-content {
    display: flex;
    width: 1240px;
    height: 53px;
    font-size: 14px;
    justify-content: flex-end;
    align-items: center;
    margin: 0 auto;
    a {
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #cdcdcd;
      line-height: 1;
      border-left: 2px solid #666;
      i {
        margin-right: 3px;
      }
      &.one {
        border: 0;
      }
      &:hover {
        color: #27ba9b;
      }
    }
  }
}
.sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.1s linear;
  .container {
    display: none;
    width: 1240px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      height: 80px;
      background: url("../assets/logo.png") no-repeat right 2px;
      background-size: 160px auto;
    }
    ul {
      width: 820px;
      display: flex;
      justify-content: space-around;
      padding-left: 40px;
      position: relative;
      li {
        margin-right: 40px;
        width: 38px;
        text-align: center;
        a {
          font-size: 16px;
          line-height: 32px;
          height: 32px;
          display: inline-block;
          color: #333;
        }
      }
    }
    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid #27ba9b;
      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;
        color: #333;
      }
    }
  }
  &.show {
    opacity: 1;
    transform: translateY(0);
    .container {
      display: flex;
    }
  }
  .mains {
    .pos {
      top: 80px;
    }
  }
}
nav {
  background: #fff;
  .contain {
    width: 1240px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: relative;
    .logo {
      display: block;
      height: 132px;
      width: 200px;
      background: url("../assets/logo.png") no-repeat center 18px / contain;
    }
    .nav {
      width: 820px;
      display: flex;
      justify-content: space-around;
      padding-left: 40px;
      position: relative;
      z-index: 1;
      li {
        margin-right: 40px;
        width: 38px;
        text-align: center;
        a {
          min-width: 30xx;
          font-size: 16px;
          line-height: 32px;
          height: 32px;
          display: inline-block;
          &:hover {
            color: #27ba9b;
            border-bottom: 1px solid #27ba9b;
          }
        }
      }
    }
    .cart {
      width: 50px;
      z-index: 2;
      position: relative;
      a {
        display: inline-block;
        margin-left: 10px;
      }
      .esShop {
        opacity: 0;
        position: absolute;
        right: 0;
        top: 40px;
        width: 400px;
        height: 400px;
        transition: all 0.3s linear;
        transform: rotateX(-90deg);
        transform-origin: 50% 0;
      }
      &:hover .esShop {
        opacity: 1;
        transform: rotateX(0);
      }
    }
  }
  .bg {
    background-color: #f5f5f5;
  }
}
.active {
  color: #27ba9b;
  border-bottom: 1px solid #27ba9b;
}

</style>