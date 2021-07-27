<template>
      <el-container class="admin-container">
  <el-header>
    <span class="systemName">
      河南科技学院机房管理系统 V1.0
    </span>
    <el-dropdown>
    <span class="el-dropdown-link">
      王老师<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <a href="/login"><el-dropdown-item command="a">退出登录</el-dropdown-item></a>
      
    </el-dropdown-menu>
  </el-dropdown>
  </el-header>
  <el-container>
    <el-aside width="200px">
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的机房</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/611">611</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Menu from '../components/admin/menu'
export default {
    components:{
        Menu,
    }
}
</script>

<style lang="scss">
.el-header{
  display: flex;
  justify-content: space-between;
  .systemName{
    color: white;
    line-height: 60px;
  }
  .el-dropdown-link{
    color: white;
    line-height: 60px;
  }
}
.admin-container{
  height: 100%;
  .el-aside{
      height: 100%;
      ul{
        height: 100%;
      }
  }
  .el-header{
      background-color: #545c64;
  }
  .el-main{
    background-color: #EAEDF1;
  }
}
</style>