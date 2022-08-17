<template>
  <div class="banner">
    <div class="banner-m">
      <el-carousel :interval="3000" arrow="always" height="500px">
        <el-carousel-item v-for="item in list" :key="item.id">
          <router-link class="banners" :to="item.hrefUrl">
            <img :src="item.imgUrl" alt="" height="500" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
      <div class="b-c" @mouseleave="indexs = 10">
        <ul>
          <li
            v-for="(item, index) of hometxt"
            :key="item.id"
            @mouseenter="indexs = index"
            :class="index == indexs ? 'color' : ''"
          >
            <router-link :to="'/category/' + item.id">{{
              item.name
            }}</router-link>
            <template v-for="(items, index) of item.children" :key="items.id">
              <router-link :to="'/category/sub/' + items.id" v-if="index <= 1">
                {{ items.name }}
              </router-link>
            </template>
          </li>
          <li @mouseenter="indexs = 9">
            <router-link to="/">品牌</router-link>
            <router-link to="/">品牌推荐</router-link>
          </li>
        </ul>
        <div class="b-c-c" v-if="hometxt.length - 1 >= indexs">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="item of hometxt[indexs]['goods']" :key="item.id">
              <router-link :to="'/product/' + item.id">
                <img :src="item.picture" alt="" />
                <div class="ctxt">
                  <p>{{ item.name }}</p>
                  <p class="ellipsis">
                    {{ item.desc }}
                  </p>
                  <p class="red">
                    ￥<span>{{ item.price }}</span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="b-c-c" v-if="9 == indexs">
          <h4>品牌推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="item of pplist" :key="item.id">
              <router-link :to="'/'">
                <img :src="item.picture" alt="" />
                <div class="ctxt">
                  <p>{{ item.name }}</p>
                  <p class="ellipsis">
                    {{ item.desc }}
                  </p>
                  <p class="ellipsis">
                    {{ item.place }}
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useTxtStore } from "../../store/useStore";
import { reactive, toRefs } from "vue-demi";
export default {
  setup() {
    const usetxtStore = useTxtStore();
    const { hometxt } = storeToRefs(usetxtStore);
    const hc = reactive({
      list: [],
      pplist: [],
      indexs: 10,
      getlist() {
        axios.get("/api/home/banner").then((res) => {
          hc.list = res.result;
          if (res.result.length > 6) {
            this.list.length = 6;
          }
        });
      },
      getpplist() {
        axios.get("/api/home/brand?limit=6").then((res) => {
          hc.pplist = res.result;
        });
      }
    });
    hc.getlist();
    hc.getpplist();
    
    return {
      ...toRefs(hc),
      hometxt,
    };
  },
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 500px;
  background-color: #f5f5f5;
  .banner-m {
    width: 1240px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    background-color: #fff;
    .banners {
      display: block;
      width: 100%;
      height: 100%;
    }
    .b-c {
      z-index: 2;
      width: 250px;
      height: 500px;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.8);
      ul {
        padding: 0;
        li {
          padding-left: 40px;
          height: 50px;
          line-height: 50px;
          a {
            font-size: 14px;
            margin-right: 4px;
            color: #fff;
            &:nth-of-type(1) {
              font-size: 16px;
            }
          }
          &:hover {
            background-color: #27ba9b;
          }
          &.color {
            background-color: #27ba9b;
          }
        }
      }
      .b-c-c {
        z-index: 2;
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.795);
        position: absolute;
        left: 250px;
        top: 0;
        padding: 0 15px;
        h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 400;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-between;
          li {
            width: 310px;
            height: 120px;
            margin: 0;
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #fff;
            a {
              display: flex;
              flex-wrap: nowrap;
              width: 100%;
              height: 100%;
              line-height: 1;
              margin: 0;
            }
            img {
              width: 96px;
              height: 96px;
              margin-right: 12px;
            }
            .ctxt {
              width: 190px;
              margin: auto;
              p {
                color: #333;
                font-size: 16px;
                line-height: 24px;
                &.ellipsis {
                  font-size: 14px;
                  color: rgb(153, 153, 153);
                  max-width: 94%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                &.red {
                  color: #bd2e2e;
                }
                span {
                  font-size: 20px;
                }
              }
            }
            &:hover {
              background-color: #e3f9f4;
            }
          }
        }
      }
    }
  }
}
/deep/ .el-carousel__arrow--left {
  z-index: 1;
  left: 260px;
}
/deep/ .el-carousel__arrow--right {
  z-index: 1;
}
/deep/ .el-carousel__indicators--horizontal {
  left: 62%;
}
</style>