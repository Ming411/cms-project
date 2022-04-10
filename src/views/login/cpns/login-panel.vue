<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginPhone,
    LoginAccount
  },
  setup() {
    // 当前选择的登录方式
    const currentTab = ref<string>('account')
    const isKeepPassword = ref(true)
    // 获取组件对象
    // typeof LoginAccount 拿到组件导出的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        // 注意传递过去的是value值
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('调用手机号登录逻辑')
      }
    }
    // console.log(LoginAccount)
    // console.log(typeof LoginAccount) // object
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.login-panel {
  text-align: center;
  margin-bottom: 150px;
  width: 320px;
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
