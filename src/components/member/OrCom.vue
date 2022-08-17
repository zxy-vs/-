<template>
  <div class="head">
    <span>下单时间：{{ item.payLatestTime }}</span>
    <span>订单编号：{{ item.id }}</span>
  </div>
  <div class="body">
    <div class="goods column">
      <ul>
        <li v-for="items of item.skus" :key="items.id">
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
        <p v-if="index + 1 == item.orderState">{{ items }}</p>
        <p v-if="item.orderState == 3 && index + 1 == item.orderState">
          <a href="javascript:;" class="green">查看物流</a>
        </p>
        <p v-if="item.orderState == 4 && index + 1 == item.orderState">
          <a href="javascript:;" class="green">评价商品</a>
        </p>
      </template>
    </div>
    <div class="amount column">
      <p class="red">¥{{ item.payMoney }}</p>
      <p>（含运费：¥{{ item.postFee }}）</p>
      <p>在线支付</p>
    </div>
    <div class="action column">
      <button class="btn" v-if="item.orderState == 1 || item.orderState == 3">
        立即付款
      </button>
      <p>
        <a href="javascript:;">查看详情</a>
      </p>
      <p v-if="item.orderState == 1">
        <a href="javascript:;">取消订单</a>
      </p>
      <p
        v-if="
          item.orderState == 2 ||
          item.orderState == 3 ||
          item.orderState == 4 ||
          item.orderState == 5
        "
      >
        <a href="javascript:;">再次购买</a>
      </p>
      <p v-if="item.orderState == 4 || item.orderState == 5">
        <a href="javascript:;">申请售后</a>
      </p>
      <!-- <p>
        <a href="javascript:;">立即付款</a>
      </p> -->
    </div>
  </div>
</template>

<script setup>
defineProps(["item"]);
const ll = ["待付款", "待发货", "待收货", "待评价", "已完成", "已取消"];
//  const indexs =  0,
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
</style>