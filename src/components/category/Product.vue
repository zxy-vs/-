<template>
  <div class="product" v-if="pddt.name != undefined">
    <div class="head">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ name: 'category', params: { id: pddt.categories[1].id } }"
          >{{ pddt.categories[1].name }}</el-breadcrumb-item
        ><el-breadcrumb-item
          :to="{ name: 'sub', params: { id: pddt.categories[0].id } }"
          >{{ pddt.categories[0].name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ pddt.name }} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="pct">
      <div class="media">
        <div class="m-img">
          <div
            class="big"
            v-show="show"
            :style="{ backgroundImage: `url(${pddt.mainPictures[indexs]})` }"
          ></div>
          <div
            class="middle"
            @mouseenter="enter"
            @mouseleave="leave"
            @mousemove="move"
          >
            <img :src="pddt.mainPictures[indexs]" alt="" />
            <div class="mini"></div>
          </div>
          <ul class="small">
            <li
              v-for="(item, index) of pddt.mainPictures"
              :key="index"
              @mouseenter="indexs = index"
              :class="index == indexs ? 'active' : ''"
            >
              <img :src="item" alt="" />
            </li>
          </ul>
        </div>
        <ul class="m-sales">
          <li>
            <p>销量人气</p>
            <p>200+</p>
            <p>销量人气+</p>
          </li>
          <li>
            <p>商品评价</p>
            <p>400+</p>
            <p>查看评价</p>
          </li>
          <li>
            <p>收藏人气</p>
            <p>600+</p>
            <p>收藏商品</p>
          </li>
          <li>
            <p>品牌信息</p>
            <p>苏宁电器</p>
            <p>品牌主页</p>
          </li>
        </ul>
      </div>
      <div class="spec">
        <p class="p-n">{{ pddt.name }}</p>
        <p class="p-d">{{ pddt.desc }}</p>
        <p class="p-p">
          <span>￥{{ pddt.price }}</span>
          <span>￥{{ pddt.oldPrice }}</span>
        </p>
        <div class="p-se">
          <dl>
            <dt>促销</dt>
            <dd>12月好物放送，App领券购买直降120元</dd>
          </dl>
          <dl>
            <dt>配送</dt>
            <dd>
              <div class="main-box" v-if="selectedOptions.length">
                <b>至：</b>
                <el-cascader
                  size="small"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                >
                </el-cascader>
              </div>
            </dd>
            <dd>未设置地址请前往个人中心设置地址</dd>
          </dl>
          <dl>
            <dt>服务</dt>
            <dd>
              <span>无忧退货</span><span>快速退款</span><span>免费包邮</span>
              <a href="javascript:;">了解详情</a>
            </dd>
          </dl>
        </div>
        <div class="sku">
          <dl v-for="(item, index) of pddt.specs" :key="index">
            <dt>{{ item.name }}</dt>
            <dd>
              <template v-for="(items, index) of item.values" :key="index">
                <img
                  v-if="items.picture"
                  :class="namess == items.name ? 'select' : ''"
                  @click="namess = items.name"
                  :src="items.picture"
                  :alt="items.desc"
                  :title="items.name"
                />
                <span
                  v-if="!items.picture"
                  :class="names == items.name ? 'select' : ''"
                  @click="names = items.name"
                  >{{ items.name }}</span
                >
              </template>
            </dd>
          </dl>
        </div>
        <div class="nb">
          <div class="label">数量</div>
          <div class="nbb">
            <el-input-number v-model="num" :min="1" :max="100" readonly />
          </div>
        </div>
        <div class="btn" @click="product.addCart()">加入购物车</div>
      </div>
    </div>
    <div class="gr">
      <div class="header">
        <i> </i>
        <span class="tit">同类商品推荐</span>
      </div>
      <div class="xc">
        <el-carousel height="380px" :autoplay="false">
          <el-carousel-item v-for="(item, index) in xc" :key="index">
            <div class="xci">
              <router-link
                :to="'/product/' + items.id"
                v-for="items of item"
                :key="items.id"
              >
                <img :src="items.picture" alt="" />
                <p class="ellipsis name">{{ items.name }}</p>
                <p class="price">¥{{ items.price }}</p>
              </router-link>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="footer">
      <Footer :pddt="pddt" />
    </div>
  </div>
</template>

<script setup>
import { regionData, CodeToText } from "element-china-area-data";
import { defineComponent, reactive, ref, toRefs, watchEffect } from "vue-demi";
import { useRoute } from "vue-router";
import { useTxtStore } from "../../store/useStore";
import Footer from "./Footer.vue";
const route = useRoute();
const usetxtStore = useTxtStore();
defineComponent({ Footer });
const product = reactive({
  pddt: {},
  indexs: 0,
  namess: "",
  names: "",
  num: 1,
  show: false,
  options: regionData,
  selectedOptions: [],
  xc: [],
  getpddt(id) {
    axios.get("/api/goods?id=" + id).then((res) => {
      this.pddt = res.result;
      if (res.result.userAddresses.length) {
        this.selectedOptions = [
          res.result.userAddresses[0].provinceCode,
          res.result.userAddresses[0].cityCode,
          res.result.userAddresses[0].countyCode,
        ];
      }
    });
  },
  getxc(id) {
    axios.get(`/api/goods/relevant?id=${id}&limit=16`).then((res) => {
      this.xc = [];
      let index = 0;
      for (let item in res.result) {
        if (item % 4) {
          index++;
          this.xc[Math.floor(item / 4)][index] = res.result[item];
        } else {
          this.xc.push([]);
          index = 0;
          this.xc[item / 4][index] = res.result[item];
        }
      }
    });
  },
  addCart() {
    var id;
    if (this.namess && this.names) {
      id = this.pddt.skus.filter(
        (v) =>
          v.specs[0].valueName == this.namess &&
          v.specs[1].valueName == this.names
      );
      if (!id.length) {
        id = this.pddt.skus.filter(
          (v) =>
            v.specs[0].valueName == this.names &&
            v.specs[1].valueName == this.namess
        );
      }
    } else {
      id = this.pddt.skus.filter((v) => v.specs[0]["valueName"] == this.namess);
      if (!id.length) {
        id = this.pddt.skus.filter(
          (v) => v.specs[0]["valueName"] == this.names
        );
      }
    }
    if (id.length == 1) {
      axios
        .post("/api/member/cart", { skuId: id[0].id, count: this.num })
        .then((res) => {
          usetxtStore.getCart();
        });
    } else {
      ElMessage({
        message: "未选择规格或数量太小",
        type: "warning",
      });
    }
  },
});
const handleChange = () => {
  var loc = "";
  for (let i = 0; i < selectedOptions.value.length; i++) {
    loc += CodeToText[selectedOptions.value[i]];
  }
  console.log(loc, selectedOptions.value);
};

const { pddt, indexs, show, options, selectedOptions, names, namess, num, xc } =
  {
    ...toRefs(product),
  };
const enter = (e) => {
  e.target.children[1].style.display = "block";
  show.value = true;
};
const leave = (e) => {
  show.value = false;
  e.target.children[1].style.display = "none";
};
const move = (e) => {
  let left =
    e.pageX -
    e.target.parentNode.parentNode.offsetLeft -
    e.target.parentNode.children[1].offsetWidth / 2;
  let top =
    e.pageY -
    e.target.parentNode.parentNode.offsetTop -
    e.target.parentNode.children[1].offsetHeight / 2;
  let maxLeft =
    e.target.parentNode.offsetWidth -
    e.target.parentNode.children[1].offsetWidth;
  let maxTop =
    e.target.parentNode.offsetHeight -
    e.target.parentNode.children[1].offsetHeight;
  let minTop = 0;
  let minLeft = 0;
  left = Math.max(minLeft, left);
  left = Math.min(maxLeft, left);
  top = Math.max(minTop, top);
  top = Math.min(maxTop, top);
  e.target.parentNode.children[1].style.left = left + "px";
  e.target.parentNode.children[1].style.top = top + "px";
  e.target.parentNode.parentNode.children[0].style.backgroundPositionX =
    -left * 2 + "px";
  e.target.parentNode.parentNode.children[0].style.backgroundPositionY =
    -top * 2 + "px";
};

watchEffect(() => {
  if (route.name == "product") {
    product.getpddt(route.params.id);
    product.getxc(route.params.id);
    product.namess = "";
    product.names = "";
  }
});
</script>

<style lang="less" scoped>
.product {
  width: 1240px;
  margin: 0 auto;
  .head {
    padding: 25px 10px;
  }
  .pct {
    min-height: 600px;
    background: #fff;
    display: flex;
    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
      .m-img {
        width: 480px;
        height: 400px;
        position: relative;
        display: flex;
        .big {
          z-index: 2;
          position: absolute;
          top: 0;
          left: 412px;
          width: 400px;
          height: 400px;
          box-shadow: 0 0 10px rgb(0 0 0 / 10%);
          background-repeat: no-repeat;
          background-size: 800px 800px;
          background-color: #f8f8f8;
        }
        .middle {
          width: 400px;
          height: 400px;
          background: #f5f5f5;
          cursor: move;
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
          .mini {
            display: none;
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.2);
            position: absolute;
          }
        }
        .small {
          width: 80px;
          li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;
            img {
              max-width: 100%;
              max-height: 100%;
              vertical-align: middle;
            }
            &.active {
              border: 2px solid #27ba9b;
            }
          }
        }
      }
      .m-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;
        li {
          flex: 1;
          position: relative;
          p {
            font-size: 14px;
            &:first-child {
              color: #999;
            }
            &:nth-of-type(2) {
              color: #cf4444;
              margin-top: 10px;
            }
            &:last-child {
              color: #666;
              margin-top: 10px;
            }
          }
          & ~ li::after {
            position: absolute;
            top: 10px;
            left: 0;
            height: 60px;
            border-left: 1px solid #e4e4e4;
            content: "";
          }
        }
      }
    }
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
      .p-n {
        font-size: 22px;
      }
      .p-d {
        color: #999;
        margin-top: 10px;
      }
      .p-p {
        margin-top: 10px;
        span {
          &:last-child {
            color: #999;
            text-decoration: line-through;
            font-size: 16px;
          }
          &:first-child {
            color: #cf4444;
            margin-right: 10px;
            font-size: 22px;
          }
        }
      }
      .p-se {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;
        dl {
          margin: 0;
          padding-bottom: 20px;
          display: flex;
          align-items: center;
          dt {
            width: 50px;
            color: #999;
          }
          dd {
            display: flex;
            align-items: center;
            color: #666;
            margin: 0;
            span {
              margin-right: 10px;
              &::before {
                content: "•";
                color: #27ba9b;
                margin-right: 2px;
              }
            }
            a {
              color: #27ba9b;
            }
          }
        }
      }
      .sku {
        padding-left: 10px;
        padding-top: 20px;
        dl {
          margin: 0;
          display: flex;
          padding-bottom: 10px;
          align-items: center;
          dt {
            width: 50px;
            color: #999;
          }
          dd {
            flex: 1;
            color: #666;
            line-height: 40px;
            margin: 0;
            img {
              width: 50px;
              height: 50px;
              margin-bottom: 5px;
              border: 1px solid #e4e4e4;
              margin-right: 10px;
              cursor: pointer;
              &.select {
                border-color: #27ba9b;
              }
            }
            span {
              display: inline-block;
              height: 30px;
              line-height: 28px;
              padding: 0 20px;
              border: 1px solid #e4e4e4;
              margin-right: 10px;
              cursor: pointer;
              &.select {
                border-color: #27ba9b;
              }
            }
          }
        }
      }
      .nb {
        display: flex;
        align-items: center;
        .label {
          width: 60px;
          color: #999;
          padding-left: 10px;
        }
        .nbb {
          width: 120px;
          height: 30px;
        }
      }
      .btn {
        margin-top: 20px;
        border-color: #27ba9b;
        background: #27ba9b;
        color: #fff;
        width: 180px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .gr {
    background: #fff;
    min-height: 460px;
    margin-top: 20px;
    .header {
      height: 80px;
      line-height: 80px;
      padding: 0 20px;
      i {
        width: 16px;
        height: 16px;
        display: inline-block;
        border-top: 4px solid #27ba9b;
        border-right: 4px solid #27ba9b;
        box-sizing: border-box;
        position: relative;
        transform: rotate(45deg);
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          left: 0;
          top: 2px;
          background: #bcf1e6;
        }
      }
      .tit {
        font-size: 20px;
        padding-left: 10px;
      }
    }
    .xc {
      height: 380px;
      min-width: 300px;
      min-height: 150px;
      position: relative;
      .xci {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
            white-space: nowrap;
          }
          .price {
            font-size: 16px;
            color: #cf4444;
            margin-top: 15px;
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    margin-top: 20px;
  }
}
/deep/.el-carousel__arrow {
  top: 120px;
}
/deep/.el-carousel__button {
  background-color: #27ba9b;
}
</style>