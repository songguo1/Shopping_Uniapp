import { useMemberStore } from '@/stores'
// 请求基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 拦截器配置
const httpInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
      // 1. 非 http 开头需拼接地址
      if (!options.url.startsWith('http')) {
        options.url = baseURL + options.url
      }
      // 2. 请求超时
      options.timeout = 10000
      // 3. 添加小程序端请求头标识
      options.header = {
        'source-client': 'miniapp',
        ...options.header,
      }
      // 4. 添加 token 请求头标识
      const memberStore = useMemberStore()
      const token = memberStore.profile?.token
      if (token) {
        options.header.Authorization = token
      }
    },
  }
  
  // 拦截 request 请求
  uni.addInterceptor('request', httpInterceptor)
  // 拦截 uploadFile 文件上传
  uni.addInterceptor('uploadFile', httpInterceptor)

//封装 Promise 请求函数

// tip 实现需求

// 1. 返回 Promise 对象，用于处理返回值类型
// 2. 成功 resolve
//    1. 提取数据
//    2. 添加泛型
// 3. 失败 reject
//    1. 401 错误
//    2. 其他错误
//    3. 网络错误
interface Data<T>{
  code:String,
  msg:String,
  result:T
}
export const http=<T>(options:UniApp.RequestOptions)=>{
  return new Promise<Data<T>>((resolve,reject)=>{
    uni.request({
      ...options,
      // 成功回调
      success(res){
        //
        if(res.statusCode>=200&&res.statusCode<300){
          resolve(res.data as Data<T>)
        }
        else if(res.statusCode===401){
          //401错误
          const memeberStore=useMemberStore();
          memeberStore.clearProfile();
          uni.navigateTo({url:'/pages/login/login'})
          reject(res.data)
        } else{
          uni.showToast({
            icon:'none',
            titile:(res.data as Data<T>).msg||'请求失败',
          })
        }
      },
      //失败
      fail(err){
        uni.showToast({
          icon:'none',
          titile:'请求失败',
        })
        reject(err)
    }})
  })
}