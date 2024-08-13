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

运行npx change-env start