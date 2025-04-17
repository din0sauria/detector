<template>
  <view class="container">
    <!-- 概率显示区域 -->
    <view class="progressBox">
      <ProgressCircleBar
        :size="300"
        :percent="percent"
        :progressColor="progressColor"

        inner-color="#F8F9FA"
        :ball-size="45"
      >

        </progressCircleBar>

    </view>
    <!-- <text class="percent" :style="{color: percent > 50 ? '#FF0000' : '#00FF00'}">{{percent}}%</text> -->

    <!-- 概率描述文本 -->
    <view class="description">音频伪造概率</view>

    <!-- 文件描述文本 -->
    <view class="file-name">{{name}}</view>

    <!-- 上传按钮 -->
    <button class="upload-btn" :disabled="loading" :loading="loading" @tap="handleUpload">
      {{ loading ? '上传检测中...' : '音频文件上传' }}
    </button>

    <!-- 去录音按钮 -->
    <button class="record-btn" @tap="goToRecord">
      去录音
    </button>
  </view>
</template>
<script setup>
  import {
    ref,
    computed
  } from 'vue'
  import ProgressCircleBar from './ring.vue'
  // 响应式数据
  const percent = ref(0)
  const loading = ref(false)
  const name = ref('未上传文件')
  // 根据百分比计算颜色
  const progressColor = computed(() => {
    // 绿色（0%）的 RGB 值
    const green = [0, 255, 0];
    // 红色（100%）的 RGB 值
    const red = [255, 0, 0];

    // 根据百分比计算 RGB 值
    const r = Math.round(red[0] * (percent.value / 100) + green[0] * (1 - percent.value / 100));
    const g = Math.round(red[1] * (percent.value / 100) + green[1] * (1 - percent.value / 100));
    const b = Math.round(red[2] * (percent.value / 100) + green[2] * (1 - percent.value / 100));

    // 将 RGB 转换为十六进制颜色
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    console.log(`#${hex}`)
    if (percent.value < 45) {
      return ['#72d555',`#${hex}`]
    } else {
      return ['#72d555',`#FFA500`,`#${hex}`]
    }
  })
  // 处理文件上传
  const handleUpload = async () => {
    try {
      // 文件选择
      const res = await uni.chooseMessageFile({
        count: 1,
        type: 'file',
        extension: ['wav', 'mp3', 'm4a']
      })

      if (!res?.tempFiles?.[0]) return

      name.value = res.tempFiles[0].name
      loading.value = true

      // 文件上传
      uni.uploadFile({
        url: 'http://110.41.61.229:3006/common/upload',
        filePath: res.tempFiles[0].path,
        name: 'file',
        formData: {
          'content-type': 'multipart/form-data'
        },
        success: (uploadRes) => {
          try {
            const data = JSON.parse(uploadRes.data)
            percent.value = Number((parseFloat(data.probability) * 100).toFixed(2))
            
            // 新增：保存到历史记录
            saveHistory({
              fileName: name.value,
              source: '文件上传',
              result: percent.value,
              time: new Date().toLocaleString()
            })

          } catch (e) {
            uni.showToast({
              title: e,
              icon: 'error',
              duration: 2000
            })
          } 
        },
        fail: (err) => {
          uni.showToast({
            title: '上传失败',
            icon: 'error'
          })
          console.error('上传失败:', err)
        },
        complete: () => {
          loading.value = false
        }
      })
    } catch (err) {
      console.error('文件选择错误:', err)
      uni.showToast({
        title: '文件选择失败',
        icon: 'error'
      })
    }
  }

  // 跳转到录音页面
  const goToRecord = () => {
    uni.navigateTo({
      url: '/pages/record/record'
    })
  }

  // 新增：保存历史记录方法
  const saveHistory = (data) => {
    let history = uni.getStorageSync('detectHistory') || []
    history.unshift(data)
    if (history.length > 50) history = history.slice(0, 50)
    uni.setStorageSync('detectHistory', history)
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 30rpx;
  }

  .progressBox {
      position: relative;
      width: 300rpx;
      height: 300rpx;
      margin: 0 auto;
      margin: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }


  
  .description{
    font-size: 40rpx;
    margin: 30rpx;
  }
  
  .file-name {
    font-size: 28rpx;
    margin: 30rpx;
  }

  button {
    width: 60%;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 50rpx;
    font-size: 36rpx;
    margin-top: 50rpx;
  }

  .upload-btn {
    background-color: #007AFF;
    color: white;
  }

  .upload-btn[disabled] {
    background-color: #CCCCCC;
  }

  .record-btn {
    background-color: #34C759;
    color: white;
    margin-top: 100rpx;
  }
</style>