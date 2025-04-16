"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "record",
  setup(__props) {
    const tape = common_vendor.index.getRecorderManager();
    const audio = common_vendor.index.createInnerAudioContext();
    const state = common_vendor.ref(0);
    const time = common_vendor.ref(0);
    const tempFilePath = common_vendor.ref(null);
    const timer = common_vendor.ref(null);
    const timeDisplay = common_vendor.reactive({
      h: "00",
      m: "00",
      s: "00"
    });
    common_vendor.onLoad(() => {
      updateTime();
    });
    common_vendor.onUnmounted(() => {
      clearInterval(timer.value);
      audio.destroy();
    });
    const formatTime = (time2) => {
      return time2 < 10 ? `0${time2}` : time2;
    };
    const updateTime = () => {
      if (!timeDisplay) {
        common_vendor.index.__f__("error", "at pages/record/record.vue:104", "timeDisplay is undefined");
        return;
      }
      const total = time.value || 0;
      timeDisplay.h = formatTime(Math.floor(total / 3600));
      timeDisplay.m = formatTime(Math.floor(total % 3600 / 60));
      timeDisplay.s = formatTime(Math.floor(total % 60));
    };
    const handleRecord = () => {
      common_vendor.index.__f__("log", "at pages/record/record.vue:116", "handleRecord");
      switch (state.value) {
        case 0:
          startRecording();
          break;
        case 1:
          pauseRecording();
          break;
        case 2:
          resumeRecording();
          break;
      }
    };
    const startRecording = () => {
      state.value = 1;
      tape.start();
      startTimer();
    };
    const pauseRecording = () => {
      state.value = 2;
      clearInterval(timer.value);
      tape.pause();
    };
    const resumeRecording = () => {
      state.value = 1;
      tape.resume();
      startTimer();
    };
    const stopRecording = () => {
      state.value = 0;
      clearInterval(timer.value);
      tape.stop();
      resetTimer();
      common_vendor.index.showToast({
        title: "自动保存成功",
        duration: 1e3
      });
    };
    const playRecording = () => {
      if (!tempFilePath.value) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请先录制音频"
        });
        return;
      }
      audio.src = tempFilePath.value;
      audio.play();
      startarti.showToast({
        title: "播放中",
        duration: 1e3
      });
    };
    const startTimer = () => {
      timer.value = setInterval(() => {
        time.value++;
        updateTime();
      }, 1e3);
    };
    const resetTimer = () => {
      time.value = 0;
      updateTime();
    };
    tape.onStop((res) => {
      tempFilePath.value = res.tempFilePath;
    });
    common_vendor.computed(() => {
      return ["开始录音", "暂停录音", "继续录音"][state.value];
    });
    const visualizerBars = common_vendor.ref(
      Array.from({
        length: 15
      }, () => ({
        height: Math.random() * 30 + 10
      }))
    );
    const statusMessage = common_vendor.computed(() => {
      return [
        "点击红色按钮开始录音",
        "录音中...",
        "已暂停"
      ][state.value];
    });
    common_vendor.ref(false);
    const saveToLocal = async () => {
      if (!tempFilePath.value)
        return;
      try {
        const res = common_vendor.index.getFileSystemManager();
        res.writeFileSync(`${common_vendor.wx$1.env.USER_DATA_PATH}/hello.txt`, tempFilePath.value);
        common_vendor.index.showToast({
          title: `保存成功：${res.savedFilePath}`,
          icon: "success",
          duration: 2e3
        });
      } catch (error) {
        common_vendor.index.showModal({
          title: "保存失败",
          content: error.errMsg,
          showCancel: false
        });
      }
    };
    const uploadFile = async () => {
      if (!tempFilePath.value)
        return;
      common_vendor.index.showLoading({
        title: "上传中...",
        mask: true
      });
      try {
        const res = await common_vendor.index.uploadFile({
          url: "http://110.41.61.229:3006/common/upload",
          // 替换为实际接口
          filePath: tempFilePath.value,
          header: {
            "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
          },
          name: "file",
          formData: {
            "content-type": "multipart/form-data"
          }
        });
        if (res.statusCode === 200) {
          common_vendor.index.showToast({
            title: "上传成功",
            icon: "success"
          });
        } else {
          throw new Error(`上传失败：${res.data}`);
        }
      } catch (error) {
        common_vendor.index.showModal({
          title: "上传失败",
          content: error.message,
          showCancel: false
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t((timeDisplay == null ? void 0 : timeDisplay.h) || "00"),
        b: common_vendor.t((timeDisplay == null ? void 0 : timeDisplay.m) || "00"),
        c: common_vendor.t((timeDisplay == null ? void 0 : timeDisplay.s) || "00"),
        d: state.value !== 0
      }, state.value !== 0 ? {
        e: common_vendor.f(visualizerBars.value, (bar, index, i0) => {
          return {
            a: index,
            b: bar.height + "px"
          };
        })
      } : {}, {
        f: common_vendor.p({
          type: "headphones",
          size: "30",
          color: "blue"
        }),
        g: !tempFilePath.value ? 1 : "",
        h: common_vendor.o(playRecording),
        i: state.value === 1 ? 1 : "",
        j: state.value === 2 ? 1 : "",
        k: common_vendor.o(handleRecord),
        l: common_vendor.p({
          type: "circle-filled",
          size: "30",
          color: "red"
        }),
        m: state.value === 0 ? 1 : "",
        n: common_vendor.o(stopRecording),
        o: common_vendor.t(statusMessage.value),
        p: common_vendor.p({
          type: "download",
          size: "24",
          color: "#666"
        }),
        q: !tempFilePath.value,
        r: common_vendor.o(saveToLocal),
        s: common_vendor.p({
          type: "cloud-upload",
          size: "24",
          color: "#666"
        }),
        t: !tempFilePath.value,
        v: common_vendor.o(uploadFile)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef6850c5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/record/record.js.map
