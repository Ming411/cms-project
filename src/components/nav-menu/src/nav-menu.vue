<template>
  <div class="nav-menu">
    <div
      class="logo"
      :style="{ 'justify-content': !collapse ? 'flex-start' : 'center' }"
    >
      <img class="img" src="~@/assets/img/logo.svg" alt="" />
      <span v-show="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="false"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 有两级的菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <component
                v-if="item.icon"
                :is="item.icon.slice(8, 9).toUpperCase() + item.icon.slice(9)"
                style="
                  width: 1.5em;
                  height: 1.5em;
                  margin-right: 8px;
                  color: #123456;
                "
              ></component>
              <span>{{ item.name }}</span></template
            >
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 子菜单 -->
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <component
                  v-if="subitem.icon"
                  :is="
                    subitem.icon.slice(8, 9).toUpperCase() + item.icon.slice(9)
                  "
                  style="
                    width: 1.5em;
                    height: 1.5em;
                    margin-right: 8px;
                    color: #123456;
                  "
                ></component>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 只有一层的情况 -->
        <template v-else-if="item.type === 2">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <component
              v-if="item.icon"
              :is="item.icon.slice(8, 9).toUpperCase() + item.icon.slice(9)"
              style="
                width: 1.5em;
                height: 1.5em;
                margin-right: 8px;
                color: #123456;
              "
            ></component>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
// import { useStore } from 'vuex'
import { useStore } from '@/store'
// 使用router的方法二者皆可
// import router from '@/router/index'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 拿路径，匹配菜单，显示左侧的高亮
    const currentPath = route.path
    const userMenus = computed(() => store.state.login.userMenus)

    // computed格式的数据取值也是通过value属性
    const menu = pathMapToMenu(userMenus.value, currentPath)
    // currentPath 从首页来的时候时main匹配不的,所以要判断一下是否存在
    // const defaultValue = ref(menu ? menu.id : '2' + '')
    const defaultValue = ref(menu.id + '')
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenus, handleMenuItemClick, defaultValue }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
    min-height: 0 !important;
  }
  .el-submenu {
    background-color: #001529 !important;
  }

  :deep(.el-sub-menu .el-menu-item) {
    padding-left: 50px !important;
    background-color: #0c2135;
    &:hover {
      background-color: skyblue;
    }
  }

  // ::v-deep .el-submenu__title {
  //   background-color: #001529 !important;
  // }
  :deep(.el-sub-menu__title) {
    background-color: #001529 !important;
    svg {
      color: pink !important;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff; // 菜单
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 400px;
  }
}
</style>
