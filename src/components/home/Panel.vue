<template>
  <div class="container">
    <div class="tit">
      <h3>{{ item.name }}</h3>
      <div class="sub">
        <router-link
          :to="'/category/sub/' + items.id"
          v-for="items of item.children"
          :key="items.id"
        >
          {{ items.name }}
        </router-link>
      </div>
      <router-link :to="'/category/' + item.id" class="all">
        <span>查看全部</span>
        <ArrowRight style="width: 1em; height: 1em; margin-bottom: -3px" />
      </router-link>
    </div>
    <div class="box">
      <router-link :to="'/category/' + item.id" class="img">
        <img :src="item.picture" alt="" />
        <strong>
          <span>{{ item.name }}</span>
          <span v-html="item.saleInfo"></span>
        </strong>
      </router-link>
      <ul class="plist">
        <li v-for="items of item.goods" :key="items.id">
          <div class="p-c">
            <router-link :to="'/product/' + items.id" class="simg">
              <img :src="items.picture" alt="" />
            </router-link>
            <p class="ellipsis-2 ellipsis">{{ items.name }}</p>
            <p class="desc ellipsis">{{ items.desc }}</p>
            <p class="price">￥{{ items.price }}</p>
            <div class="extra">
              <router-link to="/">
                <span>找相似</span>
                <span>发现现多宝贝 ></span>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue-demi";
export default {
  props: ["item"],
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1240px;
  margin: 0 auto;
  position: relative;
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
    .all {
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
    .sub {
      margin-bottom: 2px;
      margin-right: 80px;
      a {
        padding: 2px 12px;
        font-size: 16px;
        border-radius: 4px;
        color: #333;
        &:hover {
          color: #fff;
          background-color: #27bb9a;
        }
      }
    }
  }
  .box {
    display: flex;
    .img {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      strong {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: 400;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          width: 76px;
          background: rgba(0, 0, 0, 0.9);
          text-align: center;
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .plist {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        &:nth-of-type(-n + 4) {
          margin-bottom: 0;
        }
        .p-c {
          width: 240px;
          height: 300px;
          padding: 10px 30px;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
          transition: all 0.5s;
          .simg {
            display: block;
            width: 160px;
            height: 160px;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            margin-top: 6px;
            font-size: 16px;
          }
          .ellipsis-2 {
            height: 44px;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .desc {
            color: #666;
            height: 22px;
            white-space: nowrap;
          }
          .price {
            margin-top: 10px;
            font-size: 20px;
            color: #cf4444;
          }
          .extra {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 86px;
            width: 100%;
            background: #27ba9b;
            text-align: center;
            transform: translateY(100%);
            transition: all 0.5s;
            a {
              color: #333;
              span {
                display: block;
                color: #fff;
                width: 120px;
                margin: 0 auto;
                font-size: 12px;
                line-height: 20px;
                margin-top: 5px;
                &:first-child {
                  font-size: 18px;
                  border-bottom: 1px solid #fff;
                  line-height: 40px;
                  margin-top: 5px;
                }
              }
            }
          }
        }
        &:hover .p-c {
          border: 1px solid #27ba9b;
          .extra {
            transform: translateY(0);
          }
        }
      }
    }
  }
}
</style>