<template>
  <div class="login">
    <header>
      <div class="head-content">
        <router-link to="/" class="logo"> </router-link>
        <h3 class="head-tit">欢迎登录</h3>
        <router-link to="" class="entry"> 进入网站首页 </router-link>
      </div>
    </header>
    <main>
        <LoginCom/>
    </main>
    <footer>
      <div class="container">
        <p>
          <a href="javascript:;" v-for="(item, index) of flist" :key="index" :class="index==0?'non':''">
              {{ item }}
            </a
          >
        </p>
        <p>CopyRight © 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import LoginCom from "../components/login/LoginCom.vue";
export default {
    setup() {
        const login = reactive({
            flist: [
                "关于我们",
                "帮助中心",
                "售后服务",
                "配送与验收",
                "商务合作",
                "搜索推荐",
                "友情链接",
            ],
        });
        return {
            ...toRefs(login),
        };
    },
    components: { LoginCom }
};
</script>

<style lang="less" scoped>
.login {
  header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    .head-content {
      display: flex;
      align-items: center;
      width: 1240px;
      margin: 0 auto;
      a {
        display: inline-block;
      }
      .logo {
        width: 200px;
        height: 132px;
        background: url("../assets/logo.png") no-repeat 0 15px;
        background-size: contain;
      }
      .head-tit {
        flex: 1;
        margin: 16px 0 0 20px;
        font-size: 24px;
        font-weight: 400;
        color: #666;
      }
      .entry {
        width: 120px;
        font-size: 16px;
      }
    }
  }
  main {
    height: 488px;
    background: url("../assets/bg.png");
    position: relative;
  }
  footer {
    padding: 30px 0 50px;
    background: #fff;
    .container {
      width: 1240px;
      margin: 0 auto;
      p {
        text-align: center;
        color: #999;
        padding-top: 20px;
        a {
          line-height: 1;
          padding: 0 10px;
          color: #999;
          display: inline-block;
          border-left: 1px solid #ccc;
        }
        .non {
          border: 0;
        }
      }
    }
  }
}
</style>