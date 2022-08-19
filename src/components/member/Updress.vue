<template>
  <div class="header">
    <h3>修改收货地址</h3>
    <a href="javascript:;" @click="close"
      ><el-icon><Close /></el-icon
    ></a>
  </div>
  <div class="main" v-if="address.length">
    <ul
      v-for="(item, index) of address"
      :key="item.id"
      @click="indexs = index"
      :class="indexs == index ? 'select' : ''"
    >
      <li>
        <span>收<i></i>货<i></i>人：</span>{{ item.receiver }}
      </li>
      <li><span>联系方式：</span>{{ tel(item.contact) }}</li>
      <li><span>收货地址：</span>{{ item.fullLocation }}{{ item.address }}</li>
    </ul>
  </div>
  <div class="footer">
    <button class="yes" @click="upd">确定</button>
    <button @click="close">取消</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, toRefs } from "vue-demi";
import { useTxtStore } from "../../store/useStore";
const props = defineProps(["address"]);
const { address } = toRefs(props);
const emit = defineEmits(["upadd"]);
const usetxtStore = useTxtStore();
const indexs = ref(999);
const { indress } = storeToRefs(usetxtStore);
const tel = (num) => {
  return num.replace(/^(\d{3})\d{4}(\d{4})/, "$1****$2");
};
const close = () => {
  emit("upadd", false);
};
const upd = () => {
  if (indexs.value < address.value.length) {
    indress.value = indexs.value;
    emit("upadd", false);
  } else {
    ElMessage.error("请选择相应的地址");
  }
};
</script>

<style lang="less" scoped>
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
.main {
  margin: 20px 40px;
  font-size: 16px;
  flex: 1;
  min-height: 90px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  ul {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 10px;
    border: 1px solid #f5f5f5;
    &.select {
      border: 1px solid #27ba9b;
      background: #27ba9a2a;
    }
    &:hover {
      border: 1px solid #27ba9b;
      background: #27ba9a2a;
    }
  }
}
.footer {
  text-align: center;
  padding: 10px 0 30px 0;
  button {
    background: #ccc;
    color: #fff;
    width: 180px;
    height: 50px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &.yes {
      border-color: #27ba9b;
      background: #27ba9b;
      color: #fff;
      margin-right: 20px;
    }
  }
}
</style>