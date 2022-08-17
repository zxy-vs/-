<template>
  <div class="cg" v-if="cgda.name != undefined">
    <div class="head">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ cgda.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="banner">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in list" :key="item.id">
          <router-link class="banners" :to="item.hrefUrl">
            <img :src="item.imgUrl" alt="" height="500" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="subList">
      <h3>全部分类</h3>
      <ul>
        <li v-for="item of cgda.children" :key="item.id">
          <router-link :to="'/category/sub/' + item.id">
            <img :src="item.picture" alt="" />
            <p>{{ item.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="r-g" v-for="item of cgda.children" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }} -</h3>
        <p>温暖柔软，品质之选</p>
        <router-link :to="'/category/sub/' + item.id">
          <span>查看全部</span>
          <ArrowRight style="width: 1.2em; height: 1.2em; font-size: 16px" />
        </router-link>
      </div>
      <ul class="body">
        <li v-for="items of item.goods" :key="items.id">
          <router-link :to="'/product/' + items.id">
            <img :src="items.picture" alt="" />
            <p class="name ellipsis">{{ items.name }}</p>
            <p class="desc ellipsis">{{ items.desc }}</p>
            <p class="price">￥{{ items.price }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue-demi";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const cg = reactive({
      cgda: {},
      list: [],
      getcgda(id) {
        axios.get("/api/category?id=" + id).then((res) => {
          this.cgda = res.result;
        });
      },
      getlist() {
        axios.get("/api/home/banner").then((res) => {
          this.list = res.result;
          if (res.result.length > 6) {
            this.list.length = 6;
          }
        });
      },
    });
    cg.getlist();
    watchEffect(() => {
      if (route.name == "category") {
        cg.getcgda(route.params.id);
      }
    });
    return {
      route,
      ...toRefs(cg),
    };
  },
};
</script>

<style lang="less" scoped>
.cg {
  width: 1240px;
  margin: 0 auto;
  position: relative;
  .head {
    padding: 25px 10px;
  }
  .banner {
    width: 100%;
    height: 500px;
    background-color: #f5f5f5;
    .banners {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .subList {
    margin-top: 20px;
    background-color: #fff;
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: 400;
      text-align: center;
      line-height: 100px;
    }
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
            vertical-align: middle;
          }
          p {
            line-height: 40px;
            color: #333;
          }
          &:hover p {
            color: #27ba9b;
          }
        }
      }
    }
  }
  .r-g {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      padding: 0;
      h3 {
        font-size: 28px;
        color: #666;
        font-weight: 400;
        text-align: center;
        line-height: 100px;
      }
      p {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
      a {
        display: flex;
        align-items: center;
        position: absolute;
        top: 20px;
        right: 20px;
        margin-bottom: 2px;
        span {
          font-size: 16px;
          vertical-align: middle;
          margin-right: 4px;
          color: #999;
        }
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
      li {
        transition: all 0.5s;
        a {
          display: block;
          width: 220px;
          padding: 20px 30px;
          text-align: center;
          transition: all 0.5s;
          img {
            width: 160px;
            height: 160px;
          }
          p {
            padding-top: 10px;
            white-space: nowrap;
            &.desc {
              color: #999;
              height: 29px;
            }
            &.price {
              color: #cf4444;
              font-size: 20px;
            }
            &.name {
              font-size: 16px;
            }
          }
        }
        &:hover {
          transform: translateY(-3px);
          box-shadow: #ccc 1px 2px 10px 2px;
        }
      }
    }
  }
}
</style>