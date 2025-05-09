"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniSteps",
  props: {
    direction: {
      // 排列方向 row column
      type: String,
      default: "row"
    },
    activeColor: {
      // 激活状态颜色
      type: String,
      default: "#2979FF"
    },
    deactiveColor: {
      // 未激活状态颜色
      type: String,
      default: "#B7BDC6"
    },
    active: {
      // 当前步骤
      type: Number,
      default: 0
    },
    activeIcon: {
      // 当前步骤
      type: String,
      default: "checkbox-filled"
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
    // 数据
  },
  data() {
    return {
      heightArr: []
    };
  },
  mounted() {
    if (this.direction === "column") {
      let that = this;
      common_vendor.index.createSelectorQuery().in(this).selectAll(".uni-steps__column-text").boundingClientRect((data) => {
        that.heightArr = data.map((item) => item.height + 1);
      }).exec();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.options, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: index === $props.active ? $props.activeColor : $props.deactiveColor,
        c: common_vendor.t(item.desc),
        d: index
      };
    }),
    b: common_vendor.n($props.direction === "column" ? "uni-steps__column-title" : "uni-steps__row-title"),
    c: $props.deactiveColor,
    d: common_vendor.n($props.direction === "column" ? "uni-steps__column-desc" : "uni-steps__row-desc"),
    e: common_vendor.n($props.direction === "column" ? "uni-steps__column-text" : "uni-steps__row-text"),
    f: common_vendor.n($props.direction === "column" ? "uni-steps__column-text-container" : "uni-steps__row-text-container"),
    g: common_vendor.f($props.options, (item, index, i0) => {
      return common_vendor.e({
        a: index <= $props.active && index !== 0 ? $props.activeColor : index === 0 ? "transparent" : $props.deactiveColor,
        b: index === $props.active
      }, index === $props.active ? {
        c: "26a526fc-0-" + i0,
        d: common_vendor.p({
          color: $props.activeColor,
          type: $props.activeIcon,
          size: "14"
        }),
        e: common_vendor.n($props.direction === "column" ? "uni-steps__column-check" : "uni-steps__row-check")
      } : {
        f: common_vendor.n($props.direction === "column" ? "uni-steps__column-circle" : "uni-steps__row-circle"),
        g: index < $props.active ? $props.activeColor : $props.deactiveColor
      }, {
        h: index < $props.active && index !== $props.options.length - 1 ? $props.activeColor : index === $props.options.length - 1 ? "transparent" : $props.deactiveColor,
        i: index,
        j: $props.direction === "column" ? $data.heightArr[index] + "px" : "14px"
      });
    }),
    h: common_vendor.n($props.direction === "column" ? "uni-steps__column-line" : "uni-steps__row-line"),
    i: common_vendor.n($props.direction === "column" ? "uni-steps__column-line--before" : "uni-steps__row-line--before"),
    j: common_vendor.n($props.direction === "column" ? "uni-steps__column-line" : "uni-steps__row-line"),
    k: common_vendor.n($props.direction === "column" ? "uni-steps__column-line--after" : "uni-steps__row-line--after"),
    l: common_vendor.n($props.direction === "column" ? "uni-steps__column-line-item" : "uni-steps__row-line-item"),
    m: common_vendor.n($props.direction === "column" ? "uni-steps__column-container" : "uni-steps__row-container"),
    n: common_vendor.n($props.direction === "column" ? "uni-steps__column" : "uni-steps__row")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-steps/components/uni-steps/uni-steps.js.map
