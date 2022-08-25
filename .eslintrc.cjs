module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    $: 'readonly',
    $$: 'readonly',
    $ref: 'readonly',
    $shallowRef: 'readonly',
    $computed: 'readonly',
    Fn: 'readonly',
    PromiseFn: 'readonly',
    RefType: 'readonly',
    LabelValueOptions: 'readonly',
    EmitType: 'readonly',
    TargetContext: 'readonly',
    ComponentElRef: 'readonly',
    ComponentRef: 'readonly',
    ElRef: 'readonly',
    global: 'readonly',
    ForDataType: 'readonly',
    ComponentRoutes: 'readonly',
    Recordable: 'readonly',
    // CanvasTextBaseline: "readonly",
    // NodeJS: "readonly",

    // script setup
    defineOptions: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',

    document: 'readonly',
    localStorage: 'readonly',
    baiduMap: 'readonly',
    window: 'readonly',
    // 腾讯地图
    TMap: 'readonly'
  },
  extends: [
    // 'plugin:vue/essential',
    // 使用 vue3 规则
    'plugin:vue/vue3-strongly-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 在写变量const {} 写一半时就会在vscode提示出错误来，非常的烦锁
    indent: 'off',
    // 允许使用下划线命名
    '@typescript-eslint/indent': ['error', 2],
    camelcase: 'off',
    // vue的index.vue不需要使用驼峰命名
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'] // 需要忽略的组件名
      }
    ],
    // 可以debugger
    'no-debugger': 'off'

  }
}
