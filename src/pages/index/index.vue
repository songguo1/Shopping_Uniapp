<script setup lang="ts">
import CustomNavbar from '@/components/CustomNavbar.vue'
import {
  getHomeBannerApi,
  getHomeCategoryAPI,
  getHomeGoodsGuessLikeAPI,
  getHomeHotAPI,
} from '@/services/home'
import type { BannerItem, CategoryItem, GoodsItem, GuessItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CategoryPanel from '@/components/CategoryPanel.vue'
import HotPanel from '@/components/HotPanel.vue'

//获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result as BannerItem[]
}
//获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result as CategoryItem[]
}

//获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result as HotItem[]
}

//获取猜你喜欢数据
const guessList = ref<GuessItem[]>([])
const getGoodsGuessLikeData = async () => {
  const res = await getHomeGoodsGuessLikeAPI()
  guessList.value = res.result.items as GuessItem[]
}

//页面加载
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
  getGoodsGuessLikeData()

})

//滚动触底
const onScrollToLower = () => {
  getGoodsGuessLikeData()
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <!-- 内容区域 -->
  <scroll-view scroll-y @scrolltolower="onScrollToLower">
    <!-- 自定义轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 分类面板 -->
    <CategoryPanel :list="categoryList"></CategoryPanel>
    <!-- 热门推荐 -->
    <HotPanel :list="hotList"></HotPanel>
    <!-- 猜你喜欢 -->
    <XtxGuess :list="guessList"></XtxGuess>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
//
</style>
