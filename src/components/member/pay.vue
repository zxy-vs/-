<template>
  <div class="pay">
    <div class="head">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/cart">购物车</el-breadcrumb-item>
        <el-breadcrumb-item>支付订单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="info" v-if="payda.id">
        <SuccessFilled
          style="width: 1em; height: 1em; font-size: 80px; color: #1dc779"
        />
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="lasttime >= 0">
            支付还剩 <span>{{ `${m}分${s}秒` }}</span
            >, 超时后将取消订单
          </p>
          <p v-else>订单已经超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ payda.payMoney }}</span>
        </div>
      </div>
      <div class="type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a href="javascript:;" class="btn wx"></a>
          <a href="javascript:;" class="btn zfb"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a href="javascript:;" class="btn">招商银行</a>
          <a href="javascript:;" class="btn">工商银行</a>
          <a href="javascript:;" class="btn">建设银行</a>
          <a href="javascript:;" class="btn">农业银行</a>
          <a href="javascript:;" class="btn">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onBeforeUnmount,
  reactive,
  toRefs,
  watchEffect,
} from "vue-demi";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const pay = reactive({
      payda: {},
      lasttime: 0,
      time: null,
      m: "",
      s: "",
      getpay(id) {
        axios.get("/api/member/order/" + id).then((res) => {
          this.payda = res.result;
          this.surplus(res.result.payLatestTime);
        });
      },
      surplus(time) {
        let sur = +new Date(time);
        this.time = setInterval(() => {
          let now = +new Date();
          this.lasttime = sur - now;
          this.m = (((sur - now) / 1000 / 60) % 60).toFixed(0)
          this.s = (((sur - now) / 1000) % 60).toFixed(0)
          this.m = this.m > 10 ? this.m : "0" + this.m;
          this.s = this.s > 10 ? this.s : "0" + this.s;
        }, 1000);
      },
    });
    onBeforeUnmount(() => {
      clearInterval(pay.time);
    });
    watchEffect(() => {
      if (route.path == "/member/pay") {
        pay.getpay(route.query.id);
      }
    });
    return {
      ...toRefs(pay),
    };
  },
};
</script>

<style lang="less" scoped>
.pay {
  width: 1240px;
  margin: 0 auto;
  position: relative;
  .head {
    padding: 25px 10px;
  }
  .info {
    font-size: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    height: 240px;
    padding: 0 80px;
    .tip {
      padding-left: 10px;
      flex: 1;
      p {
        font-size: 20px;
        margin-bottom: 5px;
        &:last-child {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .amount {
      span {
        color: #999;
        font-size: 16px;
        &:last-child {
          color: #cf4444;
          font-size: 20px;
        }
      }
    }
  }
  .type {
    margin-top: 20px;
    background-color: #fff;
    padding-bottom: 70px;
    .item {
      p {
        line-height: 70px;
        height: 70px;
        padding-left: 30px;
        font-size: 16px;
      }
      .btn {
        width: 150px;
        height: 50px;
        border: 1px solid #e4e4e4;
        text-align: center;
        line-height: 48px;
        margin-left: 30px;
        color: #666;
        display: inline-block;
        &:hover {
          border: 1px solid #27bb9a;
        }
      }
      .wx {
        background: url("~@/assets/wxzf.jpg") no-repeat 50% / contain;
      }
      .zfb {
        background: url("~@/assets/zfbzf.png") no-repeat 50% / contain;
      }
    }
  }
}
</style>