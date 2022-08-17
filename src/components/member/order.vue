<template>
  <div class="order">
    <nav>
      <a
        href="javascript:;"
        v-for="(item, index) of nav"
        @click="indexs = index"
        :class="indexs == index ? 'active' : ''"
        :key="index"
        >{{ item }}</a
      >
    </nav>
    <div class="o-list" v-if="or.items">
      <div class="o-item" v-for="item of or.items" :key="item.id">
        <or-com :item="item" />
      </div>
    </div>
    <div class="x-p" v-if="pages>1">
      <el-pagination 
        v-model:currentPage="page"
        :page-size="5"
        background
        layout="prev, pager, next"
        :total="pages * 5"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, watchEffect } from "vue-demi";
import { useRoute } from "vue-router";
import OrCom from "./OrCom.vue";
const route = useRoute();
const order = reactive({
  nav: ["全部订单", "待付款", "待发货", "待收货", "待评价", "已完成", "已取消"],
  indexs: 0,
  page: 1,
  pages: 1,
  or: {},
  getor(page, state) {
    axios
      .get(`/api/member/order?page=${page}&pageSize=5&orderState=${state}`)
      .then((res) => {
        this.or = res.result;
        this.pages = res.result.pages;
      });
  },
});
const { nav, indexs, or, page, pages } = toRefs(order);
watchEffect(() => {
  if (route.path == "/member/order") {
    order.getor(order.page, indexs.value);
  }
});
</script>

<style lang="less" scoped>
.order {
  font-size: 14px;
  background: #fff;
  nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      color: #333;
      &.active {
        border-top: 2px solid #27ba9b;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
  .o-list {
    background: #fff;
    padding: 20px;
    position: relative;
    min-height: 400px;
    .o-item {
      margin-bottom: 20px;
      border: 1px solid #f5f5f5;
    }
  }
  .x-p {
    display: flex;
    justify-content: center;
    padding: 30px;
  }
}
</style>