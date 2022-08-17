<template>
  <div class="sub">
    <div class="head">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ name: 'category', params: { id: subc.parentId } }"
          >{{ subc.parentName }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ subc.name }} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="filter">
      <div class="item" v-for="item of subc.brands" :key="item.id">
        <div class="heads">品牌：</div>
        <div class="body">
          <a href="javascript:;">全部</a>
          <a class="ellipsis" href="javascript:;">{{ item.name }}</a>
        </div>
      </div>
      <div class="item" v-for="item of subc.saleProperties" :key="item.id">
        <div class="heads">{{ item.name }}：</div>
        <div class="body">
          <a href="javascript:;">全部</a>
          <a
            class="ellipsis"
            href="javascript:;"
            v-for="items of item.properties"
            :key="items.id"
            >{{ items.name }}</a
          >
        </div>
      </div>
    </div>
    <div class="list">
      <div class="sub-sort">
        <div class="sort">
          <a href="javascript:;">默认排序</a>
          <a href="javascript:;">最新商品</a>
          <a href="javascript:;">最高人气</a>
          <a href="javascript:;">评论最多</a>
          <a href="javascript:;">
            价格排序 <i class="up"></i><i class="down"></i
          ></a>
        </div>
        <div class="check">
          <el-checkbox v-model="checked1" label="仅显示有货商品" size="large" />
          <el-checkbox v-model="checked2" label="仅显示特惠商品" size="large" />
        </div>
      </div>
      <ul v-if="list.length">
        <li v-for="item of list" :key="item.id">
          <router-link :to="'/product/' + item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">￥{{ item.price }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="none" v-show="page == pages">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, toRefs, watchEffect } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const isScroll = ref(true);
const sub = reactive({
  subc: {},
  id: 0,
  list: [],
  page: 1,
  pages: 2,
  checked1: "",
  checked2: "",
  getSubc(id) {
    axios.get("/api/category/sub/filter?id=" + id).then((res) => {
      this.subc = res.result;
    });
  },
  getList(id) {
    if (this.id != id) {
      this.page = 1;
    }
    if (this.pages >= this.page) {
      axios
        .post("/api/category/goods/temporary", {
          categoryId: id,
          page: this.page,
          pageSize: 20,
        })
        .then((res) => {
          this.pages = res.result.pages;
          if (this.id != id) {
            this.list = res.result.items;
            this.id = id;
          } else {
            this.list.push(...res.result.items);
          }
          isScroll.value = true;
        });
    }
  },
});
const { subc, list, checked1, checked2, pages, page } = { ...toRefs(sub) };
watchEffect(() => {
  if (route.name == "sub") {
    sub.getList(route.params.id);
    sub.getSubc(route.params.id);
  }
});
onMounted(() => {
  window.onload = function () {
    window.onscroll = function () {
      if (
        document.documentElement.scrollTop + window.innerHeight >
          document.documentElement.scrollHeight * 0.9 &&
        isScroll.value
      ) {
        isScroll.value = false;
        sub.getList(route.params.id);
      }
    };
  };
});
onBeforeUnmount(()=>{
  window.onscroll = null
})
</script>

<style lang="less" scoped>
.sub {
  width: 1240px;
  margin: 0 auto;
  position: relative;
  .head {
    padding: 25px 10px;
  }
  .filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      .heads {
        width: 80px;
        color: #999;
        line-height: 40px;
      }
      .body {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        a {
          font-size: 14px;
          margin-right: 36px;
          transition: all 0.3s;
          display: inline-block;
          max-width: 112px;
          line-height: 40px;
          white-space: nowrap;
          &.active {
            color: #27ba9b;
          }
        }
      }
    }
  }
  .list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;
    .sub-sort {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sort {
        display: flex;
        a {
          height: 30px;
          line-height: 28px;
          border: 1px solid #e4e4e4;
          padding: 0 20px;
          margin-right: 20px;
          color: #999;
          border-radius: 2px;
          position: relative;
          transition: all 0.3s;
          i {
            position: absolute;
            border: 5px solid transparent;
            right: 8px;
          }
          .up {
            top: 3px;
            border-bottom-color: #bbb;
          }
          .down {
            top: 15px;
            border-top-color: #bbb;
          }
          &.active {
            background: #27ba9b;
            border-color: #27ba9b;
            color: #fff;
          }
        }
      }
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      transition: all 0.5s;
      margin-right: 20px;
      margin-bottom: 20px;
      a {
        display: block;
        width: 220px;
        padding: 20px 30px;
        text-align: center;
        transition: all 0.5s;
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
      &:hover {
        transform: translateY(-3px);
        box-shadow: #ccc 1px 2px 10px 2px;
      }
      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background-color: #fff;
    .img {
      width: 200px;
      height: 134px;
      background: url("~@/assets/none.png") no-repeat 50% / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>