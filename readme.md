在项目根目录下创建文件change-env-runtime.config.js
模板如下

module.exports = {
envPath: './.env',
tmpList: [
{
name: '泳道',
value: 'VUE_APP_SWIMLANE'
},
{
name: '环境',
value: 'VUE_APP_UECP_ENV'
},
{
name: 'URM_URL',
value: 'VUE_APP_UDM_URL'
},
{
name: 'MQTT_SERVER',
value: 'VUE_APP_MQTT_SERVER'
}
]
}

运行npx cvrt start

更新日志
2024.8.13 1.通过降低依赖版本兼容低版本库
2.esm和cjs都转换为cjs，达到二者混用的效果3.优化正则，匹配多种格式4.增加配置文件change-env.config.js,自由配置解析字段和env文件路径

2024.8.14
添加默认模板列表（默认解析全部）
