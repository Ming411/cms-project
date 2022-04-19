<template>
  <div class="content">
    <hy-table
      v-bind="contentTableConfig"
      :listData="DataList"
      :listCount="DataCount"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #handerHandler>
        <el-button type="success" icon="Plus" v-if="isCreate"
          >新建用户</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <template #enable="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <!-- scope是一个对象，里面包含插槽传递给我们的row对象 -->
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler>
        <div class="handler_btns">
          <el-button icon="edit" size="small" type="text" v-if="isUpdate"
            >编辑</el-button
          >
          <el-button icon="delete" size="small" type="text" v-if="isDelete"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插入插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store/index'
import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  setup(props) {
    const store = useStore()
    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        // pageUrl: 'users/list',
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // const DataList = computed(() => store.state.system.userList)
    // 从vuex中获取数据
    const DataList = computed(() =>
      // 不能使用 . 的方式
      store.getters[`system/pageListData`](props.pageName)
    )
    // 获取总数据条数
    const DataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    // 因为这个公共组件，某些组件特有的属性应该通过插槽进行传递进来
    // 获取动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    return {
      DataList,
      getPageData,
      DataCount,
      pageInfo,
      otherPropSlots,
      isDelete,
      isUpdate,
      isCreate
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
