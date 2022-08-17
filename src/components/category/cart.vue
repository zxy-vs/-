<template>
  <div class="cart">
    <div class="head">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物车 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="cartc">
      <el-table :data="list" style="width: 100%">
        <el-table-column width="120">
          <template #="{ row }">
            <el-checkbox
              v-model="row.selected"
              size="large"
              @click="Select(row.skuId, row.selected)"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品信息" width="400">
          <template #="scope">
            <div class="goods">
              <router-link :to="'/product/' + scope.row.id">
                <img :src="scope.row.picture" alt="" />
              </router-link>
              <div class="sk">
                <p class="name ellipsis">{{ scope.row.name }}</p>
                <div class="skus">
                  <el-popover
                    placement="bottom"
                    :width="400"
                    trigger="click"
                    @show="getSku(scope.row.skuId, scope.row.attrsText)"
                  >
                    <template #reference>
                      <el-button>{{ scope.row.attrsText }}</el-button>
                    </template>
                    <div class="slot">
                      <div class="sku">
                        <dl v-for="(item, index) of lists.specs" :key="index">
                          <dt>{{ item.name }}</dt>
                          <dd>
                            <template
                              v-for="(items, index) of item.values"
                              :key="index"
                            >
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
                      <button @click="UpCart(scope.row.skuId, scope.row.count)">
                        确认
                      </button>
                    </div>
                  </el-popover>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="220">
          <template #="{ row }">
            <div>￥{{ row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" width="180">
          <template #="{ row }">
            <el-input-number
              v-model="row.count"
              @change="Change(row.count, row.skuId)"
              :min="1"
              :max="100"
              readonly
            />
          </template>
        </el-table-column>
        <el-table-column label="小计" width="180">
          <template #="{ row }">
            <div class="red">￥{{ row.price * row.count }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="140">
          <template #="scope">
            <p><a href="javascript:;">移入收藏夹</a></p>
            <p>
              <a
                class="green"
                href="javascript:;"
                @click="close(scope.row.skuId)"
                >删除</a
              >
            </p>
            <p><a href="javascript:;">找相似</a></p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="action">
      <div class="batch">
        <el-checkbox v-model="AllS" size="large" @click="AllSl" />
        <a href="javascript:;" @click="rmS">删除商品</a>
        <a href="javascript:;">移入收藏夹</a>
        <a href="javascript:;">清空失效商品</a>
      </div>
      <div class="total">
        共 {{ AllNum }} 件商品，已选择 {{ SelectNum }} 件，商品合计：
        <span class="red">¥{{ SelectPrice }}</span>
        <button>下单结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue-demi";
import { useTxtStore } from "../../store/useStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const usetxtStore = useTxtStore();
    const { list } = storeToRefs(usetxtStore);
    const lists = ref({});
    const namess = ref("");
    const names = ref("");
    const checked = ref("");
    const SelectNum = computed(() =>
      list.value
        .filter((v) => v.selected == true)
        .reduce((sum, v) => (sum += v.count), 0)
    );
    const SelectPrice = computed(() =>
      list.value
        .filter((v) => v.selected == true)
        .reduce((sum, v) => (sum += v.count * v.price), 0)
    );
    const AllNum = computed(() =>
      list.value.reduce((sum, v) => (sum += v.count), 0)
    );
    const AllS = computed(() => list.value.every((v) => v.selected == true));
    const close = async (skuId) => {
      await axios.delete("/api/member/cart", { data: { ids: [`${skuId}`] } });
      const index = list.value.findIndex((v) => v.skuId == skuId);
      list.value.splice(index, 1);
    };
    const Change = (value, skuId) => {
      axios.put(`/api/member/cart/${skuId}`, { count: value }).then((res) => {
        usetxtStore.getCart();
      });
    };
    const getSku = (id, txt) => {
      const arr = txt.replace(/:/g, " ").split(" ");
      namess.value = arr[1];
      names.value = arr[3];
      axios.get(`/api/goods/sku/${id}`).then((res) => {
        lists.value = res.result;
      });
    };
    const UpCart = async (skuId, num) => {
      var id;
      if (namess.value && names.value) {
        id = lists.value.skus.filter(
          (v) =>
            v.specs[0].valueName == namess.value &&
            v.specs[1].valueName == names.value
        );
        if (!id.length) {
          id = lists.value.skus.filter(
            (v) =>
              v.specs[0].valueName == names.value &&
              v.specs[1].valueName == namess.value
          );
        }
      } else {
        id = lists.value.skus.filter(
          (v) => v.specs[0]["valueName"] == namess.value
        );
        if (!id.length) {
          id = lists.value.skus.filter(
            (v) => v.specs[0]["valueName"] == namess.value
          );
        }
      }

      if (id.length == 1) {
        await close(skuId);
        axios
          .post("/api/member/cart", { skuId: id[0].id, count: num })
          .then((res) => {
            usetxtStore.getCart();
          });
      } else {
        alert("未选择规格或数量太小");
      }
    };
    const Select = (id, select) => {
      axios.put("/api/member/cart/" + id, { selected: !select }).then((res) => {
        usetxtStore.getCart();
      });
    };
    const AllSl = () => {
      let ids = [];
      for (let item of list.value) {
        ids.push(item.skuId);
      }
      axios
        .put("/api/member/cart/selected", {
          selected: AllS.value ? false : true,
          ids: ids,
        })
        .then((res) => {
          usetxtStore.getCart();
        });
    };
    const rmS = () => {
      ElMessageBox.confirm(
        "亲，您是否确认删除选中的商品",
        "Warning",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        let ids = [];
        let lists = list.value.filter((v) => v.selected == true);
        for (let item of lists) {
          ids.push(item.skuId);
        }
        axios
          .delete("/api/member/cart", {
            data: {
              ids: ids,
            },
          })
          .then((res) => {
            usetxtStore.getCart();
          });
      });
    };
    return {
      list,
      lists,
      close,
      Change,
      getSku,
      UpCart,
      names,
      namess,
      checked,
      Select,
      AllNum,
      SelectNum,
      SelectPrice,
      AllSl,
      AllS,
      rmS,
    };
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1240px;
  min-height: 100vh;
  margin: 0 auto;
  .head {
    padding: 25px 10px;
  }
  .cartc {
    background: #fff;
    color: #666;
    .goods {
      display: flex;
      align-items: center;
      a {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .sk {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;
        .name {
          white-space: nowrap;
        }
        .skus {
          height: 28px;
          padding: 0 6px;
          position: relative;
          margin-top: 10px;
          display: inline-block;
        }
      }
    }
    .red {
      font-size: 16px;
      color: #cf4444;
    }

    p {
      a {
        color: #333;
        &.green {
          color: #27ba9b;
        }
      }
    }
  }
  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;
    .batch {
      a {
        margin-left: 20px;
        color: #333;
      }
    }
    .total {
      .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: 700;
        color: #cf4444;
      }
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
/deep/.cell {
  text-align: center;
}
</style>