# MusicFree

**更多信息请参考原项目 <https://github.com/maotoumao/MusicFree#readme>**
> 基于MusiceFree修改的ios版本，提供暂且可用的ipa包

## ipa下载地址
下载地址
> 目前打包的支持 ios 15.1+
## ipa安装
  1. AltStore 
     - [AltStore官网](https://faq.altstore.io/)
     - [文字说明](https://telegra.ph/AltStore-%E4%B8%8B%E8%BC%89%E6%95%99%E5%AD%B8-03-02)
  2. Sideloadly
     - [Sideloadly官网](https://sideloadly.io/)
     - [文字说明](https://telegra.ph/AltStore-%E4%B8%8B%E8%BC%89%E6%95%99%E5%AD%B8-03-02)
  3. ......

## 开发

### 工具版本
- 代码版本: [v0.6.1](https://github.com/maotoumao/MusicFree/releases/tag/v0.6.1)
- react-native: [0.76.5](https://reactnative.dev/docs/0.76/set-up-your-environment)
- yarn: 1.22.22
- cocoapods: 1.11.3 // brew install cocoapods
- node: 20.19.4
- xcode: 16.4 

### 生成ipa
1. 搭建好 [react-native ios](https://reactnative.dev/docs/0.76/set-up-your-environment)  环境
     - 安装 npm 和 pod 包 
     - Target> Signing & Capabilities 选项卡，配置个人证书，
     - Capabilities 添加Add Capability，启用 "Audio, Airplay, and Picture in Picture"（后台播放）
   
2. 打包
     - 在 Xcode 中，确保你的构建配置设置为 Release。
     - 在 Xcode 的顶部菜单栏，选择 Product > Scheme > Edit Scheme...。在左侧的列表中选择 Run。
     - 将 Build Configuration 从 Debug 更改为 Release。
  
3. 生成ipa:
     - 进入 ~/Library/Developer/Xcode/DerivedData/  目录
     - 搜索 **.app** 选择应用程序，然后复制出来
     - 创建文件夹 Payload，把 .app文件放进去，压缩Payload.zip，重命 MusicFree.ipa 🚀

