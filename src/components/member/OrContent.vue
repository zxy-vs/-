<template>
  <div class="orc" v-if="orc.id">
    <div class="action">
      <div class="state">
        <SoldOut
          style="width: 1em; height: 1em; font-size: 40px; color: #27ba9b"
        />
        <p>{{ orcStates[orc.orderState - 1] }}</p>
      </div>
      <div class="infos">
        <p>订单编号：{{ orc.id }}</p>
        <p>下单时间：{{ orc.createTime }}</p>
      </div>
      <div class="btn">
        <button
          v-if="orc.orderState == 1 || orc.orderState == 3"
          @click="router.push('/member/pay?id=' + orc.id)"
        >
          立即付款
        </button>
        <button
          v-if="
            orc.orderState == 2 ||
            orc.orderState == 3 ||
            orc.orderState == 4 ||
            orc.orderState == 5
          "
          @click="router.push('/member/checkout?id=' + value.id)"
        >
          再次购买
        </button>
        <button v-if="orc.orderState == 1" @click="show = true">
          取消订单
        </button>
        <button v-if="orc.orderState == 4">评价商品</button>
        <button v-if="orc.orderState == 4 || orc.orderState == 5">
          申请售后
        </button>
      </div>
    </div>
    <div class="step">
      <el-steps :active="orc.orderState" align-center finish-status="success">
        <el-step title="提交订单" :description="orc.createTime" />
        <el-step title="付款成功" :description="orc.payTime" />
        <el-step title="商品发货" :description="orc.consignTime" />
        <el-step title="确认收货" :description="orc.endTime" />
        <el-step title="订单完成" :description="orc.evaluationTime" />
      </el-steps>
    </div>
    <div class="logistics" v-if="logistics">
      <p>
        <span>{{ logistics.list[0].text }}</span>
        <span>{{ logistics.list[0].time }}</span>
      </p>
      <a href="javascript:;" @click="showss = true">查看物流</a>
    </div>
    <div class="info">
      <h3>订单商品</h3>
      <div class="table">
        <thead>
          <tr>
            <th width="400">商品信息</th>
            <th width="129">单价</th>
            <th width="111">数量</th>
            <th width="129">小计</th>
            <th width="131">实付</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of orc.skus" :key="item.id">
            <td>
              <router-link :to="'/product/' + item.spuId">
                <img :src="item.image" alt="" />
                <div class="ins">
                  <p class="ellipsis">{{ item.name }}</p>
                  <p class="attrs ellipsis">{{ item.attrsText }}</p>
                </div>
              </router-link>
            </td>
            <td>￥{{ item.curPrice }}</td>
            <td>{{ item.quantity }}</td>
            <td>￥{{ item.realPay }}</td>
            <td>￥{{ item.realPay }}</td>
          </tr>
        </tbody>
      </div>
      <h3>收货信息</h3>
      <div class="box">
        <dl>
          <dd>收<i></i>货<i></i>人：</dd>
          <dt>{{ orc.receiverContact }}</dt>
        </dl>
        <dl>
          <dd>联系方式：</dd>
          <dt>{{ orc.receiverMobile }}</dt>
        </dl>
        <dl>
          <dd>收货地址：</dd>
          <dt>{{ orc.receiverAddress }}</dt>
        </dl>
      </div>
      <h3>支付方式及送货时间</h3>
      <div class="box">
        <dl>
          <dd>支付方式：</dd>
          <dt v-if="orc.payType == 1">在线支付</dt>
          <dt v-else>货到付款</dt>
        </dl>
        <dl>
          <dd>送货时间：</dd>
          <dt v-if="orc.deliveryTimeType == 1">不限</dt>
          <dt v-else-if="orc.deliveryTimeType == 2">工作日</dt>
          <dt v-else>双休或假日</dt>
        </dl>
      </div>
      <h3>发票信息</h3>
      <div class="box">
        <dl>
          <dd>发票类型：</dd>
          <dt>电子发票</dt>
        </dl>
        <dl>
          <dd>发票内容：</dd>
          <dt>日用品</dt>
        </dl>
        <dl>
          <dd>发票抬头：</dd>
          <dt>个人</dt>
        </dl>
      </div>
      <h3>订单信息</h3>
      <div class="box">
        <dl>
          <dd>订单编号：</dd>
          <dt>{{ orc.id }}</dt>
        </dl>
        <dl>
          <dd>下单时间：</dd>
          <dt>{{ orc.createTime }}</dt>
        </dl>
      </div>
      <div class="sub">
        <div class="sub-info">
          <div class="item">
            <label>商品件数：</label>
            <span>{{ orc.totalNum }}件</span>
          </div>
          <div class="item">
            <label>商品总价：</label>
            <span>¥{{ orc.totalMoney }}</span>
          </div>
          <div class="item">
            <label>运<i></i>费：</label>
            <span>¥{{ orc.postFee }}</span>
          </div>
          <div class="item">
            <label>应付总额：</label>
            <span class="price">¥{{ orc.payMoney }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="['log', show ? 'fade' : '']" v-show="show">
    <div :class="['wrapper', show ? 'fade' : '']">
      <div class="header">
        <h3>取消订单</h3>
        <a href="javascript:;" @click="cancel"
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
        <button @click="cancel">取消</button>
        <button @click="yes">确认</button>
      </div>
    </div>
  </div>
  <div :class="['log', showss ? 'fade' : '']" v-show="showss">
    <div :class="['wrapper', showss ? 'fade' : '']">
      <div class="header">
        <h3>查看物流</h3>
        <a href="javascript:;" @click="showss = false"
          ><el-icon><Close /></el-icon
        ></a>
      </div>
      <div class="bodys" v-if="logistics">
        <div class="goods">
          <a href="javascript:;">
            <img :src="logistics.picture" alt="" />
            <p>{{ logistics.count }}件商品</p>
          </a>
          <div class="inn">
            <p><span>配送企业：</span>{{ logistics.company.name }}</p>
            <p><span>快递单号：</span>{{ logistics.company.number }}</p>
            <p><span>联系电话：</span>{{ logistics.company.tel }}</p>
          </div>
        </div>
        <div class="lists" v-if="logistics.list">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in logistics.list"
              :key="index"
              :timestamp="activity.time"
            >
              {{ activity.text }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const showss = ref(false);
const route = useRoute();
const orc = ref({});
const logistics = ref();
const show = ref(false);
const indexs = ref(7);
const orcStates = ["待付款", "待发货", "待收货", "待评价", "已完成", "已取消"];
const lls = [
  "配送信息有误",
  "商品买错了",
  "重复下单/误下单",
  "忘记使用优惠券、兔币等",
  "其他渠道价格更低",
  "不想买了",
];
const getorc = async (id) => {
  await axios.get("/api/member/order/" + id).then((res) => {
    orc.value = res.result;
  });
  if (orc.value.orderState == 3 || orc.value.orderState == 4) {
    getlogistics(id);
  }
};
const cancel = () => {
  show.value = false;
  indexs.value = 7;
};
const yes = () => {
  if (indexs.value < lls.length) {
    axios
      .put(`/api/member/order/${orc.value.id}/cancel`, {
        cancelReason: lls[indexs.value],
      })
      .then((res) => {
        orc.value = res.result;
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
const getlogistics = (id) => {
  axios.get(`/api/member/order/${id}/logistics`).then((res) => {
    logistics.value = res.result;
  });
};

watchEffect(() => {
  if (route.name == "order") {
    getorc(route.params.id);
  }
});
</script>

<style lang="less" scoped>
.orc {
  font-size: 14px;
  background: #fff;
  height: 100%;
  .action {
    height: 180px;
    width: 100%;
    display: flex;
    align-items: center;
    .state {
      width: 220px;
      text-align: center;
      p {
        font-size: 16px;
        color: #666;
        margin-bottom: 10px;
      }
    }
    .infos {
      width: 240px;
      line-height: 30px;
      p {
        font-size: 14px;
        color: #999;
      }
    }
    .btn {
      flex: 1;
      text-align: right;
      margin-right: 100px;
      button {
        margin-left: 20px;
        width: 100px;
        height: 32px;
        font-size: 14px;

        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        &:first-child {
          border-color: #27ba9b;
          background: #27ba9b;
          color: #fff;
        }
        &:nth-child(2) {
          border-color: #27ba9b;
          color: #27ba9b;
          background: #e6faf6;
        }
        &:nth-child(3) {
          border-color: #ccc;
          background: #ccc;
          color: #fff;
        }
      }
    }
  }
  .step {
    padding: 20px;
  }
  .logistics {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background-color: #f5f5f5;
    margin: 30px 50px 0;
    p {
      flex: 1;
      span {
        color: #999;
        &:first-child {
          margin-right: 30px;
        }
      }
    }
    a {
      color: #27ba9b;
      text-align: center;
    }
  }
  .info {
    padding: 0 50px;
    h3 {
      font-weight: 400;
      font-size: 16px;
      padding: 25px 5px;
    }
    .table {
      font-size: 14px;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin: 0 auto;
      th {
        font-weight: 400;
        line-height: 60px;
        background: #f5f5f5;
        &:first-child {
          flex: 0;
          text-align: left;
          padding-left: 20px;
        }
      }
      td {
        color: #333;
        border-bottom: 1px solid #f5f5f5;
        text-align: center;
        a {
          display: flex;
          padding: 20px 0;
          img {
            width: 70px;
            height: 70px;
            border: 1px solid #f5f5f5;
          }
          .ins {
            align-self: center;
            padding-left: 20px;
            text-align: left;
            p {
              color: #333;
              margin-bottom: 5px;
              width: 280px;
              white-space: nowrap;
              &.attrs {
                color: #999;
              }
            }
          }
        }
        &:first-child {
          padding-left: 20px;
          border-left: 1px solid #f5f5f5;
        }
      }
    }
    .box {
      border: 1px solid #f5f5f5;
      padding: 20px;
      dl {
        display: flex;
        line-height: 30px;
        dd {
          width: 80px;
          color: #999;
          font-size: 14px;
          i {
            display: inline-block;
            width: 0.5em;
          }
        }
        dt {
          flex: 1;
          font-size: 14px;
        }
      }
    }
    .sub {
      padding: 30px 30px 100px 30px;
      overflow: hidden;
      .sub-info {
        width: 250px;
        height: 160px;
        float: right;
        font-size: 16px;
        .item {
          line-height: 40px;
          display: flex;
          label {
            width: 90px;
            i {
              display: inline-block;
              width: 2em;
            }
          }
          span {
            flex: 1;
            text-align: right;
            padding-right: 30px;
            &.price {
              font-size: 20px;
              color: #cf4444;
            }
          }
        }
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
      .goods {
        display: flex;
        background-color: #f5f5f5;
        height: 130px;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        font-size: 14px;
        a {
          width: 92px;
          height: 92px;
          border: 1px solid #e4e4e4;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          p {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 20px;
            line-height: 20px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
            text-align: center;
          }
        }
        .inn {
          flex: 1;
          padding-left: 20px;
          line-height: 30px;
          p {
            padding: 0;
            margin: 0;
            font-size: 14px;
            color: #333;
            line-height: 30px;
            span {
              color: #999;
            }
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

.el-step.is-horizontal /deep/.el-step__line {
  top: 24px;
}
/deep/.el-step__icon {
  width: 48px;
  height: 48px;
  font-size: 28px;
  .el-step__icon-inner {
    font-weight: normal;
  }
}
</style>