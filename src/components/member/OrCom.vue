<template>
  <div class="head">
    <span>下单时间：{{ value.payLatestTime }}</span>
    <span>订单编号：{{ value.id }}</span>
    <span class="down-time" v-if="times.lasttime>0&&value.orderState==1">
      <Clock style="width: 1em; height: 1em; margin-right: 3px" />
      <b>付款截止：{{ `${times.m}分${times.s}秒` }}</b> 
    </span>
    <a href="javascript:;" class="del" v-if="value.orderState==6">删除</a>
  </div>
  <div class="body">
    <div class="goods column">
      <ul>
        <li v-for="items of value.skus" :key="items.id">
          <router-link :to="'/product/' + items.spuId" class="img">
            <img :src="items.image" alt="" />
          </router-link>
          <div class="info column">
            <p class="name ellipsis">{{ items.name }}</p>
            <p class="attr ellipsis">{{ items.attrsText }}</p>
          </div>
          <div class="price red">¥{{ items.realPay }}</div>
          <div class="count">x{{ items.quantity }}</div>
        </li>
      </ul>
    </div>
    <div class="state column">
      <template v-for="(items, index) of ll" :key="index">
        <p v-if="index + 1 == value.orderState">{{ items }}</p>
        <p v-if="value.orderState == 3 && index + 1 == value.orderState">
          <a href="javascript:;" class="green">查看物流</a>
        </p>
        <p v-if="value.orderState == 4 && index + 1 == value.orderState">
          <a href="javascript:;" class="green">评价商品</a>
        </p>
      </template>
    </div>
    <div class="amount column">
      <p class="red">¥{{ value.payMoney }}</p>
      <p>（含运费：¥{{ value.postFee }}）</p>
      <p>在线支付</p>
    </div>
    <div class="action column">
      <button
        class="btn"
        v-if="value.orderState == 1 || value.orderState == 3"
        @click="router.push('/member/pay?id=' + value.id)"
      >
        立即付款
      </button>
      <p>
        <a href="javascript:;">查看详情</a>
      </p>
      <p v-if="value.orderState == 1">
        <a href="javascript:;" @click="show = true">取消订单</a>
      </p>
      <p
        v-if="
          value.orderState == 2 ||
          value.orderState == 3 ||
          value.orderState == 4 ||
          value.orderState == 5
        "
      >
        <a href="javascript:;" @click="router.push('/member/checkout?id='+value.id)">再次购买</a>
      </p>
      <p v-if="value.orderState == 4 || value.orderState == 5">
        <a href="javascript:;">申请售后</a>
      </p>
      <!-- <p>
        <a href="javascript:;">立即付款</a>
      </p> -->
    </div>
  </div>
  <div :class="['log', show ? 'fade' : '']" v-show="show">
    <div :class="['wrapper', show ? 'fade' : '']">
      <div class="header">
        <h3>取消订单</h3>
        <a href="javascript:;" @click="show = false"
          ><el-icon><Close /></el-icon
        ></a>
      </div>
      <div class="bodys">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            href="javascript:;"
            v-for="(item, index) of lls"
            :key="index"
            @click="indexs = index"
            :class="index == indexs ? 'select' : ''"
            >{{ item }}</a
          >
        </div>
      </div>
      <div class="footer">
        <button @click="show = false">取消</button>
        <button @click="yes">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref, toRefs } from "vue-demi";
import { useRouter } from "vue-router";
const emit = defineEmits(["shou"]);
const router = useRouter();
const props = defineProps(["value"]);

const ll = ["待付款", "待发货", "待收货", "待评价", "已完成", "已取消"];
const lls = [
  "配送信息有误",
  "商品买错了",
  "重复下单/误下单",
  "忘记使用优惠券、兔币等",
  "其他渠道价格更低",
  "不想买了",
];
const times = reactive({
  m: "",
  s: "",
  lasttime: 0,
  time: null,
  surplus(time) {
    let sur = +new Date(time);
    this.time = setInterval(() => {
      let now = +new Date();
      this.lasttime = sur - now;
      this.m = (((sur - now) / 1000 / 60) % 60).toFixed(0);
      this.s = (((sur - now) / 1000) % 60).toFixed(0);
      this.m = this.m > 10 ? this.m : "0" + this.m;
      this.s = this.s > 10 ? this.s : "0" + this.s;
    }, 1000);
  },
});
if (props.value.payLatestTime) {
  times.surplus(props.value.payLatestTime);
}
const indexs = ref(7);
const show = ref(false);
const yes = () => {
  if (indexs.value < lls.length) {
    axios
      .put(`/api/member/order/${props.value.id}/cancel`, {
        cancelReason: lls[indexs.value],
      })
      .then((res) => {
        emit("shou", res.result);
        show.value = false;
      });
  } else {
    ElMessage({
      showClose: true,
      message: "未输入选择信息",
      type: "error",
    });
  }
};
onBeforeUnmount(() => {
  clearInterval(times.time);
});
</script>

<style lang="less" scoped>
.head {
  height: 50px;
  line-height: 50px;
  background: #f5f5f5;
  padding: 0 20px;
  overflow: hidden;
  span {
    margin-right: 20px;
    &.down-time {
      display: flex;
      align-items: center;
      margin-right: 0;
      float: right;
      b {
        vertical-align: middle;
        font-weight: 400;
      }
    }
  }
  .del{
    margin-right: 0;
    float: right;
    color: #999;
  }
}
.body {
  display: flex;
  align-items: stretch;
  .column {
    border-left: 1px solid #f5f5f5;
    text-align: center;
    padding: 20px;
    p {
      padding-top: 10px;
      a {
        color: #333;
        &:hover {
          color: #27ba9b;
        }
        &.green {
          color: #27ba9b;
        }
      }
      &.red {
        color: #cf4444;
      }
    }
  }
  .goods {
    flex: 1;
    padding: 0;
    align-self: center;
    border-left: none;
    text-align: center;
    ul {
      li {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px;
        display: flex;
        .img {
          width: 70px;
          height: 70px;
          border: 1px solid #f5f5f5;
          img {
            max-width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .info {
          width: 220px;
          text-align: left;
          padding: 0 10px;
          .name {
            padding: 0;
            height: 38px;
            margin-bottom: 5px;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .attr {
            padding: 0;
            color: #999;
            font-size: 12px;
            margin-bottom: 5px;
            white-space: nowrap;
          }
        }
        .price {
          width: 100px;
        }
        .count {
          width: 80px;
        }
        &:first-child {
          border-bottom: none;
        }
      }
    }
  }
  .state {
    width: 120px;
  }
  .amount {
    width: 200px;
  }
  .action {
    width: 140px;
    .btn {
      background: #27ba9b;
      color: #fff;
      width: 100px;
      height: 32px;
      font-size: 14px;
      text-align: center;
      border: 1px solid #27ba9b;
      border-radius: 4px;
      cursor: pointer;
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
    width: 620px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: 400;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
      }
    }
    .bodys {
      padding: 20px 40px;
      font-size: 16px;
      p {
        font-size: 16px;
        line-height: 35px;
        &.tip {
          color: #999;
        }
      }
      .btn {
        padding-top: 21px;
        display: flex;
        flex-wrap: wrap;
        a {
          width: 256px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          background-color: #fff;
          border: 1px solid #e4e4e4;
          margin-right: 20px;
          margin-bottom: 20px;
          color: #666;
          &:nth-child(2n) {
            margin-right: 0;
          }
          &.select {
            background-color: #27ba9a1a;
            border-color: #27ba9b;
          }
        }
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
      button {
        width: 180px;
        height: 50px;
        font-size: 16px;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        &:last-child {
          border-color: #27ba9b;
          background: #27ba9b;
          color: #fff;
        }
        &:first-child {
          border-color: #ccc;
          background: #ccc;
          color: #fff;
          margin-right: 20px;
        }
      }
    }
    &.fade {
      transition: all 1s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>