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
        <or-com :value="item" @shou="update" @shous="updates" @del="order.getor(order.page,indexs)"/>
      </div>
    </div>
    <div class="x-p" v-if="pages > 1">
      <el-pagination
        v-model:currentPage="page"
        :page-size="5"
        background
        layout="prev, pager, next"
        :total="pages * 5"
      />
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
            @click="indexss = index"
            :class="index == indexss ? 'select' : ''"
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
import { reactive, toRefs, watchEffect,ref, watch } from "vue-demi";
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
watch(()=>page.value,()=>{
  document.documentElement.scrollTop = 0
})
const Replace = (n) => {};
watchEffect(() => {
  if (route.path == "/member/order") {
    order.getor(order.page, indexs.value);
  }
});
const indexss = ref(7);
const show = ref(false);
const showss = ref(false);
const lls = [
  "配送信息有误",
  "商品买错了",
  "重复下单/误下单",
  "忘记使用优惠券、兔币等",
  "其他渠道价格更低",
  "不想买了",
];
const logistics = ref();
const getlogistics = (id) => {
  showss.value = true;
  axios.get(`/api/member/order/${id}/logistics`).then((res) => {
    logistics.value = res.result;
  });
};
const ids = ref();
const yes = () => {
  if (indexss.value < lls.length) {
    axios
      .put(`/api/member/order/${ids.value}/cancel`, {
        cancelReason: lls[indexss.value],
      })
      .then((res) => {
        order.or.items[order.or.items.findIndex((v) => v.id == ids.value)] =
          res.result;
        show.value = false;
        indexss.value = 7
      });
  } else {
    ElMessage({
      showClose: true,
      message: "未输入选择信息",
      type: "error",
    });
  }
};
const update = (id) => {
  show.value = true;
  ids.value = id;
};
const updates = (id) => {
  showss.value = true;
  getlogistics(id)
};
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
</style>