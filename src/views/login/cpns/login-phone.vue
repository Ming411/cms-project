<template>
  <div class="login-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="verify-code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="getBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    return {
      phone
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .getBtn {
    margin-left: 8px;
  }
}
</style>
