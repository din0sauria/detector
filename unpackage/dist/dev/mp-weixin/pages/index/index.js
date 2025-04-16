"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  ProgressCircleBar();
}
const ProgressCircleBar = () => "./ring.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const percent = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const name = common_vendor.ref("未上传文件");
    const progressColor = common_vendor.computed(() => {
      const green = [0, 255, 0];
      const red = [255, 0, 0];
      const r = Math.round(red[0] * (percent.value / 100) + green[0] * (1 - percent.value / 100));
      const g = Math.round(red[1] * (percent.value / 100) + green[1] * (1 - percent.value / 100));
      const b = Math.round(red[2] * (percent.value / 100) + green[2] * (1 - percent.value / 100));
      const hex = (r << 16 | g << 8 | b).toString(16).padStart(6, "0");
      common_vendor.index.__f__("log", "at pages/index/index.vue:60", `#${hex}`);
      if (percent.value < 45) {
        return ["#72d555", `#${hex}`];
      } else {
        return ["#72d555", `#FFA500`, `#${hex}`];
      }
    });
    const handleUpload = async () => {
      var _a;
      try {
        const res = await common_vendor.index.chooseMessageFile({
          count: 1,
          type: "file",
          extension: ["wav", "mp3", "m4a"]
        });
        if (!((_a = res == null ? void 0 : res.tempFiles) == null ? void 0 : _a[0]))
          return;
        name.value = res.tempFiles[0].name;
        loading.value = true;
        common_vendor.index.uploadFile({
          url: "http://110.41.61.229:3006/common/upload",
          filePath: res.tempFiles[0].path,
          name: "file",
          formData: {
            "content-type": "multipart/form-data"
          },
          success: (uploadRes) => {
            try {
              const data = JSON.parse(uploadRes.data);
              percent.value = Number((parseFloat(data.probability) * 100).toFixed(2));
              common_vendor.index.showToast({
                title: data.message,
                icon: "none",
                duration: 2e3
              });
            } catch (e) {
              common_vendor.index.showToast({
                title: "解析响应失败",
                icon: "error"
              });
            }
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: "上传失败",
              icon: "error"
            });
            common_vendor.index.__f__("error", "at pages/index/index.vue:111", "上传失败:", err);
          },
          complete: () => {
            loading.value = false;
          }
        });
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:118", "文件选择错误:", err);
        common_vendor.index.showToast({
          title: "文件选择失败",
          icon: "error"
        });
      }
    };
    const goToRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/record/record"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: 300,
          percent: percent.value,
          progressColor: progressColor.value,
          ["inner-color"]: "#F8F9FA",
          ["ball-size"]: 45
        }),
        b: common_vendor.t(name.value),
        c: common_vendor.t(loading.value ? "上传检测中..." : "音频文件上传"),
        d: loading.value,
        e: loading.value,
        f: common_vendor.o(handleUpload),
        g: common_vendor.o(goToRecord)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
