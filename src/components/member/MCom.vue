<template>
  <div class="member">
    <div class="xma">
      <div class="um">
        <h4>我的账户</h4>
        <div class="links">
          <router-link to="/member" class="active">个人中心</router-link>
        </div>
        <h4>交易管理</h4>
        <div class="links">
          <router-link to="/member/order" class="active">我的订单</router-link>
        </div>
      </div>
    </div>
    <div class="article">
      <router-view></router-view>
      <div class="home" v-show="route.path == '/member'">
        <div class="um">
          <div class="img">
            <img :src="usetxt.avatar" alt="" />
          </div>
          <h4>{{ usetxt.account }}</h4>
        </div>
        <div class="item">
          <a href="javascript:;">
            <Medal style="width: 1.8em; height: 1.8em" />
            <p>会员中心</p>
          </a>
          <a href="javascript:;">
            <Setting style="width: 1.8em; height: 1.8em" />
            <p>安全设置</p>
          </a>
          <a href="javascript:;">
            <Location style="width: 1.8em; height: 1.8em" />
            <p>地址管理</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useTxtStore } from "../../store/useStore";

const route = useRoute();
const usetxtStore = useTxtStore();
const { usetxt } = storeToRefs(usetxtStore);
</script>

<style lang="less" scoped>
.member {
  display: flex;
  padding-top: 20px;
  width: 1240px;
  margin: 0 auto;
  position: relative;
  .xma {
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    .um {
      background-color: #fff;
      h4 {
        margin: 0;
        font-size: 18px;
        font-weight: 400;
        padding: 20px 52px 5px;
        border-top: 1px solid #f6f6f6;
      }
      .links {
        padding: 0 52px 10px;
        a {
          display: block;
          line-height: 1;
          padding: 15px 0;
          font-size: 14px;
          color: #666;
          position: relative;
          &:hover {
            color: #27ba9b;
          }
          &.router-link-exact-active {
            color: #27ba9b;
            &::before {
              content: "";
              // display: none;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              position: absolute;
              top: 19px;
              left: -16px;
              background-color: #27ba9b;
            }
          }
        }
      }
    }
  }
  .article {
    width: 1000px;
    .home {
      height: 132px;
      background: url("~@/assets/bg1.png") no-repeat 50% / cover;
      display: flex;
      .um {
        flex: 1;
        display: flex;
        align-items: center;
        .img {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h4 {
          margin: 0;
          padding-left: 26px;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
        }
      }
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        a {
          color: #fff;
          font-size: 16px;
          text-align: center;
          p {
            line-height: 32px;
          }
        }
      }
    }
  }
}
</style>