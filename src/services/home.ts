import type { PageParams, PageResult } from "@/types/global"
import type { BannerItem, CategoryItem, GuessItem, HotItem } from "@/types/home"
import { http } from "@/utils/http"

/**
 * 首页-广告区域-小程序
 * @param distributionSite 
 * @returns 
 */
export const getHomeBannerApi=(distributionSite=1)=>{
    return http<BannerItem[]>({
        method:"GET",
        url:'/home/banner',
    })
}

export const getHomeCategoryAPI=()=>{
    return http<CategoryItem[]>({
        method:'GET',
        url:'/home/category',
    })
}

/**
 * 
 * @returns 
 */
export const getHomeHotAPI = () => {
    return http<HotItem[]>({
      method: 'GET',
      url: '/home/hot/mutli',
    })
  }

  // src/services/home.ts
/**
 * 猜你喜欢-小程序
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}