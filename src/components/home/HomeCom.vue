<template>
  <div class="homemain">
    <Banner />
    <div class="xx">
      <div class="tit">
        <h3>
          新鲜好物
          <small>新鲜出炉 品质靠谱</small>
        </h3>
        <router-link to="/">
          <span>查看全部</span>
          <ArrowRight style="width: 1em; height: 1em; margin-bottom: -3px" />
        </router-link>
      </div>
      <ul v-if="nlist.length">
        <li v-for="item of nlist" :key="item.id">
          <GlobalShow :item="item" />
        </li>
      </ul>
    </div>
    <div class="rq">
      <div class="tit">
        <h3>
          人气推荐
          <small>人气爆款 不容错过</small>
        </h3>
      </div>
      <ul v-if="hlist.length">
        <li v-for="item of hlist" :key="item.id">
          <GlobalShow :item="item" />
        </li>
      </ul>
    </div>
    <div class="rm">
      <div class="tit">
        <h3>
          热门品牌
          <small>国际经典 品质保证</small>
        </h3>
        <el-button
          @click="isNext = false"
          type="primary"
          size="small"
          plain
          icon="ArrowLeft"
        />
        <el-button
          @click="isNext = true"
          type="primary"
          size="small"
          plain
          icon="ArrowRight"
        />
      </div>
      <div class="box">
        <ul class="list" v-if="rlist.length" :class="isNext ? 'next' : ''">
          <li v-for="item of rlist" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-product" v-if="plist.length">
      <div class="home-panel" v-for="item of plist" :key="item.id">
        <Panel :item="item" />
      </div>
    </div>
    <div class="new">
      <div class="tit">
        <h3>
          最新专题
          <small></small>
        </h3>
        <router-link to="/">
          <span>查看全部</span>
          <ArrowRight style="width: 1em; height: 1em; margin-bottom: -3px" />
        </router-link>
      </div>
      <div class="wlist">
        <div class="wl-c" v-for="item of wlist" :key="item.id">
          <router-link to="/">
            <img :src="item.detailsUrl" alt="" />
            <div class="meta">
              <p class="tits">
                <span class="top ellipsis">{{ item.title }}</span>
                <span class="sub ellipsis">{{ item.summary }}</span>
              </p>
              <span class="price">￥{{ item.lowestPrice }}起</span>
            </div>
          </router-link>
          <div class="foot">
            <span>
              <Star
                style="
                  width: 1em;
                  height: 1em;
                  margin-right: 2px;
                  font-size: 16px;
                "
              />
              {{ item.collectNum }}
            </span>
            <span>
              <View
                style="
                  width: 1em;
                  height: 1em;
                  margin-right: 2px;
                  font-size: 16px;
                "
              />
              {{ item.viewNum }}
            </span>
            <span class="right">
              <ChatLineSquare
                style="
                  width: 1em;
                  height: 1em;
                  margin-right: 2px;
                  font-size: 16px;
                "
              />{{ item.replyNum }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent, reactive, toRefs } from "vue-demi";
export default {
  components: {
    Banner: defineAsyncComponent(() => import("./Banner.vue")),
    Panel: defineAsyncComponent(() => import("./Panel.vue")),
  },
  setup() {
    const HomeCom = reactive({
      nlist: [],
      hlist: [],
      rlist: [],
      plist: [],
      wlist: [],
      isNext: false,
      getnlist() {
        axios.get("/api/home/new").then((res) => {
          this.nlist = res.result;
        });
      },
      gethlist() {
        axios.get("/api/home/hot").then((res) => {
          this.hlist = res.result;
        });
      },
      getrlist() {
        axios.get("/api/home/brand?limit=10").then((res) => {
          this.rlist = res.result;
        });
      },
      getplist() {
        axios.get("/api/home/goods").then((res) => {
          this.plist = res.result;
        });
      },
      getwlist() {
        axios.get("/api/home/special").then((res) => {
          this.wlist = res.result;
        });
      },
    });
    HomeCom.getnlist();
    HomeCom.gethlist();
    HomeCom.getrlist();
    HomeCom.getplist();
    HomeCom.getwlist();
    return {
      ...toRefs(HomeCom),
    };
  },
};
</script>

<style lang="less" scoped>
.homemain {
  width: 100%;
  .xx,
  .rq {
    width: 1240px;
    margin: auto;
    ul {
      padding: 0;
      width: 1240px;
      display: flex;
      justify-content: space-between;
      height: 426px;
      li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        transition: all 0.5s;
        &:hover {
          transform: translateY(-3px);
          box-shadow: #ccc -1px 3px 10px 2px;
        }
      }
    }
  }
  .tit {
    width: 1240px;
    margin: auto;
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: 400;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
    a {
      margin-bottom: 2px;
      color: #333;
      span {
        font-size: 16px;
        vertical-align: middle;
        margin-right: 4px;
        color: #999;
      }
      &:hover {
        color: #27bb9a;
        span {
          color: #27bb9a;
        }
      }
    }
  }
  .rm {
    background-color: #f5f5f5;
    .box {
      display: flex;
      width: 1240px;
      height: 345px;
      overflow: hidden;
      padding-bottom: 40px;
      margin: auto;
      .list {
        padding: 0;
        width: 200%;
        display: flex;
        transition: all 1s;
        li {
          margin-right: 10px;
          width: 240px;
          img {
            width: 240px;
            height: 305px;
          }
        }
      }
      .next {
        transform: translateX(-50%);
      }
    }
  }
  .home-product {
    background: #fff;
    height: 2900px;
    .home-panel {
      background-color: #fff;
    }
  }
  .new {
    background: #f5f5f5;
    .wlist {
      width: 1240px;
      margin: auto;
      height: 380px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .wl-c {
        width: 404px;
        background: #fff;
        transition: all 0.5s;
        a {
          display: block;
          width: 100%;
          height: 288px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .meta {
            background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.8),
              transparent 50%
            );
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 288px;
            .tits {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 70%;
              height: 70px;
              padding: 0;
              padding-left: 16px;
              .top {
                display: block;
                color: #fff;
                font-size: 22px;
                white-space: nowrap;
              }
              .sub {
                display: block;
                font-size: 19px;
                white-space: nowrap;
                color: #999;
              }
            }
            .price {
              display: block;
              position: absolute;
              bottom: 25px;
              right: 16px;
              line-height: 1;
              padding: 4px 8px 4px 7px;
              color: #cf4444;
              font-size: 17px;
              background-color: #fff;
              border-radius: 2px;
            }
          }
        }
        .foot {
          height: 72px;
          line-height: 72px;
          padding: 0 20px;
          font-size: 16px;
          span {
            display: flex;
            align-items: center;
            float: left;
            margin-right: 25px;
            vertical-align: middle;
          }
          .right {
            float: right;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>