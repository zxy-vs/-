<template>
  <div class="checkout">
    <div class="head">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/cart">购物车</el-breadcrumb-item>
        <el-breadcrumb-item>填写订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wrapper">
      <h3>收货地址</h3>
      <div class="box-body" v-if="check.userAddresses">
        <div class="address">
          <div class="text">
            <div class="none" v-if="!check.userAddresses.length">
              您需要先添加收货地址才可提交订单。
            </div>
            <ul v-if="check.userAddresses.length">
              <li>
                <span>收<i></i>货<i></i>人：</span
                >{{ check.userAddresses[indress].receiver }}
              </li>
              <li>
                <span>联系方式：</span
                >{{ checkout.tel(check.userAddresses[indress].contact) }}
              </li>
              <li>
                <span>收货地址：</span
                >{{ check.userAddresses[indress].fullLocation
                }}{{ check.userAddresses[indress].address }}
              </li>
            </ul>
            <a
              href="javascript:;"
              v-show="check.userAddresses.length"
              @click="clas(true)"
              >修改地址</a
            >
          </div>
          <div class="action">
            <button @click="isShowss = true">切换地址</button>
            <button @click="clas(false)">添加地址</button>
          </div>
        </div>
        <div :class="['log', isShow ? 'fade' : '']" v-show="isShow">
          <div :class="['wrapper', isShow ? 'fade' : '']">
            <Address
              :txt="isShows ? check.userAddresses[indress] : '[]'"
              @showss="showss"
            />
          </div>
        </div>
        <div :class="['log', true ? 'fade' : '']" v-show="isShowss">
          <div :class="['wrapper', 's', true ? 'fade' : '']">
            <Updress :address="check.userAddresses" @upadd="upadd(is)" />
          </div>
        </div>
      </div>
      <h3>商品信息</h3>
      <div class="box-body">
        <table class="goods">
          <thead>
            <tr>
              <th width="520">商品信息</th>
              <th width="170">单价</th>
              <th width="170">数量</th>
              <th width="170">小计</th>
              <th width="170">实付</th>
            </tr>
          </thead>
          <tbody v-if="check.goods">
            <tr v-for="item of check.goods" :key="item.id">
              <td>
                <router-link :to="'/product/' + item.id">
                  <img :src="item.picture" alt="" />
                  <div class="right">
                    <p>{{ item.name }}</p>
                    <p>{{ item.attrsText }}</p>
                  </div>
                </router-link>
              </td>
              <td>￥{{ item.price }}</td>
              <td>{{ item.count }}</td>
              <td>￥{{ item.totalPrice }}</td>
              <td>￥{{ item.totalPayPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>配送时间</h3>
      <div class="box-body">
        <a
          href="javascript:;"
          class="btn"
          v-for="(item, index) of plist"
          :key="index"
          @click="deliveryTimeType = index + 1"
          :class="index + 1 == deliveryTimeType ? 'active' : ''"
          >{{ item }}</a
        >
      </div>
      <h3>支付方式</h3>
      <div class="box-body">
        <a
          href="javascript:;"
          :class="['btn', payType == 1 ? 'active' : '']"
          @click="payType = 1"
          >在线支付</a
        >
        <a
          href="javascript:;"
          :class="['btn', payType == 2 ? 'active' : '']"
          @click="payType = 2"
          >货到付款</a
        >
        <span style="color: #999">货到付款需付5元手续费</span>
      </div>
      <h3 v-show="payType != 2">支付渠道</h3>
      <div class="box-body" v-show="payType != 2">
        <a
          href="javascript:;"
          :class="['btn', payChannel == 1 ? 'active' : '']"
          @click="payChannel = 1"
          >支付宝</a
        >
        <a
          href="javascript:;"
          :class="['btn', payChannel == 2 ? 'active' : '']"
          @click="payChannel = 2"
          >微信</a
        >
      </div>
      <h3>金额明细</h3>
      <div class="box-body">
        <div class="total" v-if="check.summary">
          <dl v-for="(item, index) of tolist" :key="index">
            <dt v-html="item"></dt>
            <dd v-if="index == 0">{{ check.summary.goodsCount }}件</dd>
            <dd v-if="index == 1">￥{{ check.summary.totalPrice }}</dd>
            <dd v-if="index == 2">￥{{ check.summary.postFee }}</dd>
            <dd v-if="index == 3" class="price">
              ￥{{ check.summary.totalPayPrice }}
            </dd>
          </dl>
        </div>
      </div>
      <div class="submit">
        <button @click="Order">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { reactive, ref, toRefs } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useTxtStore } from "../../store/useStore";
import Address from "./address.vue";
import Updress from "./Updress.vue";
const usetxtStore = useTxtStore();
const router = useRouter();
const route = useRoute();
const { indress } = storeToRefs(usetxtStore);
const checkout = reactive({
  check: {},
  tolist: [
    "商品件数：",
    "商品总价：",
    ' 运<i style="display:inline-block;width:2em;"></i> 费：',
    "应付总额：",
  ],
  isShow: false,
  isShows: false,
  isShowss: false,
  plist: [
    "不限送货时间：周一至周日",
    "工作日送货：周一至周五",
    "双休日、假日送货：周六至周日",
  ],
  async getcheck(id) {
    let res;
    if (id > 0) {
      res = await axios.get("/api/member/order/repurchase/" + id);
    } else {
      res = await axios.get("/api/member/order/pre");
    }
    this.check = res.result;
    if (res.result.userAddresses.length - 1 < indress.value) {
      indress.value = 0;
    }
    let str = [];
    for (let item of res.result.goods) {
      str.push({ skuId: item.skuId, count: item.count });
    }
    order.goods = str;
  },
  tel(num) {
    return num.replace(/^(\d{3})\d{4}(\d{4})/, "$1****$2");
  },
});
const { check, tolist, plist, isShow, isShows, address, isShowss } =
  toRefs(checkout);
checkout.getcheck(route.query.id);
const clas = (is) => {
  isShow.value = true;
  isShows.value = is;
};
const showss = (is, data) => {
  isShow.value = is;
  let ins = check.value.userAddresses.findIndex((v) => v.id == data.id);
  // data!=undefined
  if (ins) {
    if (ins > 0) {
      check.value.userAddresses[ins] = data;
    } else {
      check.value.userAddresses.push(data);
      console.log(check.value.userAddresses);
    }
  } else {
    checkout.getcheck(route.query.id);
  }
};
const upadd = (is) => {
  isShowss.value = is;
};
const order = reactive({
  addressId: "",
  buyerMessage: "",
  deliveryTimeType: 1,
  goods: [],
  payChannel: 1,
  payType: 1,
});

const { deliveryTimeType, payType, payChannel } = toRefs(order);
const Order = () => {
  if (check.value.userAddresses && order.goods.length) {
    order.addressId = check.value.userAddresses[indress.value].id;
    if (order.payType == 2) {
      order.payChannel = "";
    }
    axios.post("/api/member/order", order).then((res) => {
      usetxtStore.getCart();
      if (order.payType == 2) {
        router.push("/member/order");
      } else {
        router.push("/member/pay?id=" + res.result.id);
      }
    });
  } else {
    ElMessage.error("请选择相应并填写的信息再提交订单");
  }
};
</script>

<style lang="less" scoped>
.checkout {
  width: 1240px;
  margin: 0 auto;
  position: relative;
  .head {
    padding: 25px 10px;
  }
  .wrapper {
    background: #fff;
    padding: 0 20px;
    h3 {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 400;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      font-size: 14px;
      padding: 20px 0;
      .address {
        border: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        .text {
          flex: 1;
          min-height: 90px;
          display: flex;
          align-items: center;
          .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
          }
          ul {
            flex: 1;
            padding: 20px;
            li {
              line-height: 30px;
              word-break: break-all;
              span {
                color: #999;
                margin-right: 5px;
                i {
                  width: 0.5em;
                  display: inline-block;
                }
              }
            }
          }
          a {
            color: #27ba9b;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
          }
        }
        .action {
          width: 420px;
          text-align: center;
          button {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;
            color: #666;
            background: #fff;
            text-align: center;
            border: 1px solid #e4e4e4;
            border-radius: 4px;
            cursor: pointer;
            &:first-child {
              margin-right: 10px;
            }
          }
        }
      }
      .log {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: transparent;
        .wrapper {
          width: 780px;
          background: #fff;
          border-radius: 4px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          opacity: 0;
          &.fade {
            transition: all 0.4s;
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          &.s {
            width: 600px;
          }
        }
      }
      & .fade {
        transition: all 0.4s;
        background: rgba(0, 0, 0, 0.5);
      }

      .goods {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        thead {
          tr {
            th {
              text-align: center;
              padding: 20px;
              border-bottom: 1px solid #f5f5f5;
              background: #f5f5f5;
              font-weight: 400;
              &:first-child {
                border-left: 1px solid #f5f5f5;
              }
              &:last-child {
                border-right: 1px solid #f5f5f5;
              }
            }
          }
        }
        tbody {
          tr {
            td {
              text-align: center;
              padding: 20px;
              color: #333;
              border-bottom: 1px solid #f5f5f5;
              a {
                display: flex;
                color: #333;
                text-align: left;
                img {
                  width: 70px;
                  height: 70px;
                  margin-right: 20px;
                }
                .right {
                  line-height: 24px;
                  p {
                    margin: 0;
                    padding: 0;
                  }
                }
              }
              &:first-child {
                border-left: 1px solid #f5f5f5;
              }
              &:last-child {
                border-right: 1px solid #f5f5f5;
              }
            }
          }
        }
      }
      .btn {
        width: 228px;
        height: 50px;
        border: 1px solid #e4e4e4;
        text-align: center;
        line-height: 48px;
        margin-right: 25px;
        color: #666;
        display: inline-block;
      }
      .active {
        border-color: #27ba9b;
      }
      .total {
        dl {
          display: flex;
          justify-content: flex-end;
          line-height: 50px;
          dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;
            &.price {
              font-size: 20px;
              color: #cf4444;
            }
          }
        }
      }
    }
    .submit {
      text-align: right;
      padding: 60px;
      border-top: 1px solid #f5f5f5;
      button {
        background: #27ba9b;
        color: #fff;
        width: 180px;
        height: 50px;
        font-size: 16px;
        text-align: center;
        border: 1px solid #27ba9b;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>