<template>
  <div class="ga">
    <div class="gt" >
      <nav>
        <a href="javascript:;">商品详情</a>
        <a href="javascript:;">商品评价</a>
      </nav>
      <div class="gd" v-show="true">
        <ul class="attr">
          <li v-for="(item, index) of pddt.details.properties" :key="index">
            <span class="dt">{{ item.name }}</span>
            <span class="dd">{{ item.value }}</span>
          </li>
        </ul>
        <img
          v-for="(item, index) of pddt.details.pictures"
          :key="index"
          :src="item"
          alt=""
        />
      </div>
      <div class="gc" v-show="false">
        <div class="head">
          <div class="data">
            <p>
              <span>1306</span>
              <span>人购买</span>
            </p>
            <p>
              <span>1306</span>
              <span>好评率</span>
            </p>
          </div>
          <div class="tags">
            <div class="dt">大家都在说：</div>
            <div class="dd">
              <a href="javascript:;">全部评价（832）</a>
              <a href="javascript:;">有图（46）</a>
              <a href="javascript:;">音质好（34）</a>
              <a href="javascript:;">充电快（66）</a>
              <a href="javascript:;">材质很软（32）</a>
              <a href="javascript:;">性价比高（97）</a>
            </div>
          </div>
        </div>
        <div class="sort">
          <span>排序：</span>
          <a href="javascript:;">默认</a>
          <a href="javascript:;">最新</a>
          <a href="javascript:;">最热</a>
        </div>
        <div class="list">
          <div class="item">
            <div class="user">
              <img src="" alt="" />
              <span></span>
            </div>
            <div class="body">
              <div class="score">
                <el-rate :value="value1" />
              </div>
              <div class="txt"></div>
              <div class="img">
                <div class="lists">
                  <a href="javascript:;">
                    <img src="" alt="" />
                  </a>
                </div>
              </div>
              <div class="time">
                <span></span>
                <span class="zan"> </span>
              </div>
            </div>
          </div>
        </div>
        <div class="xp"></div>
      </div>
    </div>
  </div>
  <div class="gad" >
    <div class="gh">
      <h3>24小时热销榜</h3>
      <div v-if="rx.length">
        <router-link
          :to="'/product/' + item.id"
          v-for="item of rx"
          :key="item.id"
        >
          <img :src="item.picture" alt="" />
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="desc ellipsis">{{ item.desc }}</p>
          <p class="price">￥{{ item.price }}</p>
        </router-link>
      </div>
    </div>
    <div class="gh">
      <h3>24小时热销榜</h3>
      <div v-if="zx.length">
        <router-link
          :to="'/product/' + item.id"
          v-for="item of zx"
          :key="item.id"
        >
          <img :src="item.picture" alt="" />
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="desc ellipsis">{{ item.desc }}</p>
          <p class="price">￥{{ item.price }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue-demi";

export default {
  props: ["pddt"],
  setup() {
    const foot = reactive({
      rx: [],
      value1: 0,
      getrx() {
        axios.get("/api/goods/hot?id=1489006&limit=3&type=1").then((res) => {
          this.rx = res.result;
        });
      },
      zx: [],
      getzx() {
        axios.get("/api/goods/hot?id=1489006&limit=3&type=1").then((res) => {
          this.zx = res.result;
        });
      },
    });
    foot.getrx();
    foot.getzx();

    return {
      ...toRefs(foot),
    };
  },
};
</script>

<style lang="less" scoped>
.ga {
  width: 940px;
  margin-right: 20px;
  .gt {
    min-height: 600px;
    background: #fff;
    nav {
      height: 70px;
      line-height: 70px;
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      a {
        color: #333;
        padding: 0 40px;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
        }
        &.active::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: #27ba9b;
        }
      }
    }
    .gd {
      padding: 40px;
      .attr {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
        li {
          display: flex;
          margin-bottom: 10px;
          width: 50%;
          .dt {
            width: 100px;
            color: #999;
          }
          .dd {
            flex: 1;
            color: #666;
          }
        }
      }
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
  }
  .gc {
    background-color: #fff;
    .head {
      display: flex;
      padding: 30px 0;
      .data {
        width: 340px;
        display: flex;
        padding: 20px;
        p {
          flex: 1;
          text-align: center;
          span {
            display: block;
            color: #999;
            &:first-child {
              font-size: 32px;
              color: #cf4444;
            }
          }
        }
      }
      .tags {
        flex: 1;
        display: flex;
        border-left: 1px solid #f5f5f5;
        .dt {
          font-weight: 700;
          font-size: 14px;
          width: 100px;
          text-align: right;
          line-height: 42px;
        }
        .dd {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          a {
            width: 132px;
            height: 42px;
            margin-left: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid #e4e4e4;
            background: #f5f5f5;
            color: #999;
            text-align: center;
            line-height: 40px;
            &.active {
              border-color: #27ba9b;
              background: #27ba9b;
              color: #fff;
            }
          }
        }
      }
    }
    .sort {
      height: 60px;
      line-height: 60px;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      margin: 0 20px;
      color: #666;
      span {
        margin-left: 20px;
      }
      a {
        font-size: 14px;
        margin-left: 30px;
        &.active {
          color: #27ba9b;
        }
      }
    }
    .list {
      padding: 0 20px;
      .item {
        display: flex;
        padding: 25px 10px;
        border-bottom: 1px solid #f5f5f5;
        .user {
          width: 160px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          span {
            padding-left: 10px;
            color: #666;
          }
        }
        .body {
          flex: 1;
          .score {
            line-height: 40px;
          }
          .txt {
            color: #666;
            line-height: 24px;
          }
          .img {
            .lists {
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;
              a {
                width: 120px;
                height: 120px;
                border: 1px solid #e4e4e4;
                margin-right: 20px;
                margin-bottom: 10px;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }
          }
          .time {
            color: #999;
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
          }
        }
      }
    }
    .xp {
      display: flex;
      justify-content: center;
      padding: 30px;
    }
  }
}
.gad {
  width: 280px;
  min-height: 1000px;
  .gh {
    h3 {
      height: 70px;
      background: #e26237;
      color: #fff;
      font-size: 18px;
      line-height: 70px;
      padding-left: 25px;
      margin-bottom: 10px;
      font-weight: 400;
    }
    a {
      display: block;
      width: 280px;
      padding: 20px 30px;
      text-align: center;
      margin-bottom: 10px;
      transition: all 0.5s;
      background-color: #fff;
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
  }
}
</style>