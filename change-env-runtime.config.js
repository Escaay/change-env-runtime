// UDM
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



// UMS
// export default {
//     envPath: './viteEnv/.env',
//     tmpList: [
//         {
//             name: '泳道',
//             value: 'VITE_SWIMLANE'
//         },
//         {
//             name: 'SSO',
//             value: 'VITE_SSO_HTTP_DOMAIN'
//         },
//     ]
// }