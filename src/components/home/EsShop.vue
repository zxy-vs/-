<template>
  <div class="esshop">
    <div class="pointer"></div>
    <div class="header"></div>
    <div class="main">
      <ul v-if="list.length">
        <li v-for="item of list" :key="item.id">
          <router-link :to="'/product/' + item.id">
            <img :src="item.picture" alt="" />
            <div class="center">
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="attr ellipsis">{{ item.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">¥{{ item.nowPrice }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </router-link>
          <el-icon class="ii" @click="close(item.skuId)"><Close /></el-icon>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="total">
        <p>共 {{ AllNum ? AllNum : 0 }}件商品</p>
        <p>¥{{ AllPrice ? AllPrice : 0 }}</p>
      </div>
      <el-button type="success">去购物车结算</el-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from "vue-demi";
import { useTxtStore } from "../../store/useStore";
import { storeToRefs } from "pinia";
export default {
  props: ["fn"],
  setup(props) {
    const usetxtStore = useTxtStore();
    const { list } = storeToRefs(usetxtStore);
    const esshop = reactive({
      AllNum: computed(() =>
        list.value.reduce((sum, v) => (sum += v.count), 0)
      ),
      AllPrice: computed(() =>
        list.value.reduce((sum, v) => (sum += v.count * v.price), 0).toFixed(2)
      ),
      getsList() {
        usetxtStore.getCart();
      },
      async close(skuId) {
        await axios.delete("/api/member/cart", { data: { ids: [`${skuId}`] } });
        const index = list.value.findIndex((v) => v.skuId == skuId);
        list.value.splice(index, 1);
      },
    });
    watchEffect(() => {
      props.fn(esshop.AllNum);
    });
    esshop.getsList();
    return {
      ...toRefs(esshop),
      list,
    };
  },
};
</script>

<style lang="less" scoped>
.esshop {
  position: relative;
  width: 100%;
  box-shadow: #ccc -5px -5px 20px 10px;
  border-radius: 10px;
  .pointer {
    z-index: 3;
    position: absolute;
    top: -25px;
    right: 14px;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-bottom: 15px solid #fff;
  }
  .header {
    width: 100%;
    height: 15px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
  }
  .main {
    background-color: #fff;
    padding-bottom: 80px;
    ul {
      height: 310px;
      overflow: auto;
      padding: 0 10px;
      li {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        position: relative;
        &:hover .ii {
          display: block;
        }
        a {
          display: flex;
          align-items: center;
          img {
            height: 80px;
            width: 80px;
          }
          .center {
            padding: 0 10px;
            width: 190px;
            .name {
              word-break: break-all;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              font-size: 16px;
            }
            .attr {
              color: #999;
              padding-top: 5px;
            }
          }
          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;
            .price {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
            .count {
              font-size: 16px;
              color: #cf4444;
            }
          }
        }
        .ii {
          display: none;
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 1;
          color: #666;
          cursor: pointer;
        }
      }
    }
    ul::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    ul::-webkit-scrollbar {
      width: 5px;
      background-color: #fff;
    }
    ul::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ccc;
    }
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background: #f8f8f8;
    align-items: center;
    border-radius: 0 0 10px 10px;
    .total {
      padding-left: 10px;
      color: #999;
      p:last-child {
        font-size: 18px;
        color: #cf4444;
      }
    }
  }
}
</style>