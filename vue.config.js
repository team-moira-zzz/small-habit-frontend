const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 빌드 타겟 디렉터리
  outputDir: '../small-habit-backend/src/main/resources/static',

  // 프록시 설정
  devServer: {
    proxy: 'http://localhost:8080'
  },
})
