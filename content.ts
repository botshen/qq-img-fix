import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://*.qzone.qq.com/*"],
  all_frames: true
}

// 监听 DOM 变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        // 查找所有带有旧格式URL的图片
        const images = node.querySelectorAll('img[src^="/qzone/em/"]')
        images.forEach((img) => {
          if (img instanceof HTMLImageElement) {
            // 替换URL格式
            const oldSrc = img.getAttribute("src")
            if (oldSrc) {
              const fileName = oldSrc.split("/").pop()
              const newSrc = `https://qzonestyle.gtimg.cn/qzone/em/${fileName?.replace(".gif", "@2x.gif")}`
              img.src = newSrc
            }
            // 可以添加以下样式类
            img.style.width = '24px'
            img.style.height = '24px'
            img.style.verticalAlign = 'middle'
          }
        })
      }
    })
  })
})

// 开始观察文档变化
observer.observe(document.body, {
  childList: true,
  subtree: true
})
