<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="" />
      <span class="title">Vue3+TS</span>
    </div>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <template v-for="item in userMenus" :key="item.id">
        <!-- 有两级的菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu>
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
              <el-menu-item>
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
          <el-menu-item>
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
import { defineComponent, computed } from 'vue'
// import { useStore } from 'vuex'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    console.log(store.state.login.userMenus)
    return { userMenus }
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
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
