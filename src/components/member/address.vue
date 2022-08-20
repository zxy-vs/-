<template>
  <div class="header">
    <h3 v-if="ruleForm.id">修改收货地址</h3>
    <h3 v-else>添加收货地址</h3>
    <a href="javascript:;" @click="resetForm(ruleFormRef)"
      ><el-icon><Close /></el-icon
    ></a>
  </div>
  <div class="body">
    <div class="edit">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人：" prop="receiver">
          <el-input v-model="ruleForm.receiver"  />
        </el-form-item>
        <el-form-item label="手机号：" prop="contact">
          <el-input v-model="ruleForm.contact" />
        </el-form-item>
        <el-form-item label="地区：" prop="age">
          <el-cascader
            size="small"
            :placeholder="ruleForm.fullLocation"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
        <el-form-item label="邮政编码：" prop="postalCode">
          <el-input v-model="ruleForm.postalCode" />
        </el-form-item>
        <el-form-item label="地址标签：" prop="addressTags">
          <el-input v-model="ruleForm.addressTags" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确定</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["txt"]);
const emit = defineEmits(["showss"]);
import { reactive, ref, toRefs, watch, watchEffect } from "vue-demi";
import { regionData, CodeToText } from "element-china-area-data";
const test1 = /^\S{4,}$/;
const test2 = /^\d{6}$/;
const test3 = /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
const validatePass = (rule, value, callback) => {
  if (!value.trim().length) {
    callback(new Error("未填写信息"));
  } else if (!test1.test(value)) {
    callback(new Error("信息不得少于四个字且不能有空格"));
  } else {
    callback();
  }
};
const validatePass1 = (rule, value, callback) => {
  if (!value.trim().length) {
    callback(new Error("未填写邮政编码"));
  } else if (!test2.test(value)) {
    callback(new Error("邮政编码格式不正确请重新输入"));
  } else {
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (!value.trim().length) {
    callback(new Error("请输入11位手机号"));
  } else if (!test3.test(value)) {
    callback(new Error("手机号格式不正确请重新输入"));
  } else {
    callback();
  }
};
watch(
  () => props.txt,
  () => {
    console.log(1);
    (ruleForm.address = props.txt.address ? props.txt.address : ""),
      (ruleForm.addressTags = props.txt.addressTags
        ? props.txt.addressTags
        : ""),
      (ruleForm.contact = props.txt.contact ? props.txt.contact : ""),
      (ruleForm.fullLocation = props.txt.fullLocation
        ? props.txt.fullLocation
        : ""),
      (ruleForm.postalCode = props.txt.postalCode ? props.txt.postalCode : ""),
      (ruleForm.receiver = props.txt.receiver ? props.txt.receiver : ""),
      (ruleForm.cityCode = props.txt.cityCode ? props.txt.cityCode : ""),
      (ruleForm.countyCode = props.txt.countyCode ? props.txt.countyCode : ""),
      (ruleForm.provinceCode = props.txt.provinceCode
        ? props.txt.provinceCode
        : ""),
      (ruleForm.id = props.txt.id ? props.txt.id : "");
    selectedOptions.value = [
      ruleForm.provinceCode,
      ruleForm.cityCode,
      ruleForm.countyCode,
    ];
  }
);
let ruleForm = reactive({
  address: "",
  addressTags: "",
  contact: "",
  fullLocation: "",
  postalCode: "",
  receiver: "",
  cityCode: "",
  countyCode: "",
  provinceCode: "",
  isDefault: 1,
  id: "",
});
const selectedOptions = ref([]);
const ruleFormRef = ref();
const options = ref(regionData);
const handleChange = () => {
  var loc = "";
  for (let i = 0; i < selectedOptions.value.length; i++) {
    loc += CodeToText[selectedOptions.value[i]];
  }
  ruleForm.fullLocation = loc;
  ruleForm.cityCode = selectedOptions.value[1];
  ruleForm.countyCode = selectedOptions.value[2];
  ruleForm.provinceCode = selectedOptions.value[0];
};
const rules = reactive({
  receiver: [{ validator: validatePass, trigger: "blur" }],
  addressTags: [{ validator: validatePass, trigger: "blur" }],
  address: [{ validator: validatePass, trigger: "blur" }],
  postalCode: [{ validator: validatePass1, trigger: "blur" }],
  contact: [{ validator: validatePass2, trigger: "blur" }],
  fullLocation: [{ validator: validatePass, trigger: "blur" }],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm);
      if (ruleForm.id) {
        axios.put("/api/member/address/" + ruleForm.id, ruleForm);
        emit("showss", false, ruleForm);
      } else {
        axios.post("/api/member/address", ruleForm).then((res) => {
          ruleForm.id = res.result.id;
          emit("showss", false, ruleForm);
        });
      }
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("showss", false);
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
</style>