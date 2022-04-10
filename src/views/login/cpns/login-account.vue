<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!-- :model 表示将变化的account值交给form进行验证 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { FormInstance } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    // 获取store
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<FormInstance>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            // 取消保存，清除已保存的
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 开始登录
          store.dispatch('login/accountLoginAction', { ...account })
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
