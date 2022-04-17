<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <hy-table :listData="userList" :propList="propList">
        <template #enable="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <!-- scope是一个对象，里面包含插槽传递给我们的row对象 -->
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </hy-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageSearch from '@/components/page-search'
import searchFormConfig from './config/search.config'
import { useStore } from '@/store/index'
import HyTable from '@/base-ui/table'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    HyTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)
    const propList = [
      {
        prop: 'name',
        label: '用户名',
        minWidth: '100'
      },
      {
        prop: 'realname',
        label: '真实姓名',
        minWidth: '100'
      },
      {
        prop: 'cellphone',
        label: '手机号码',
        minWidth: '100'
      },
      {
        prop: 'enable',
        label: '状态',
        minWidth: '100'
      },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250'
      }
    ]
    return {
      searchFormConfig,
      userList,
      propList
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
