import fs from 'fs'
import path from 'path'
import { select } from '@inquirer/prompts'
// import { EnvType } from './type'
import ora from 'ora'
import { cwd } from 'node:process';
console.log(`Current directory: ${cwd()}`);
// import chalk from 'chalk'
const actionChanegEnv = async () => {
    // const __filename: string = fileURLToPath(import.meta.url);
    // const __dirname: string = path.dirname(__filename);
    
    // production
    const configPath = path.join(cwd(), './change-env-runtime.config.js')
    const config = require(configPath) ?? {
        envPath: './.env',
        tmpList: []
    }
    const envPath: string = path.join(cwd(), config.envPath);
    console.log('config', config)
    // development
    // const envPath = path.join(__dirname, '../.env');

    const envContent: string = fs.readFileSync(envPath, 'utf-8');
    // VUE_APP_UECP_ENV='minor'
    const envContentArr: string[] = envContent.split(/\n/)

    // 选择要解析的字段
    const envName = await select({
        message: '选择要修改的字段',
        choices: config.tmpList.map(item => ({
            name: item.name,
            value: item.name,
            disabled: false,
        })),
        default: config.tmpList[0]?.name
      });

    // 根据env文件解析出泳道列表和测试环境列表
    const tmpObj = config.tmpList.find(item => item.name === envName)
    console.log('tmpObj', tmpObj)
    const activeValueRegExp = new RegExp(`^${tmpObj.value}(\x20)?=`)
    const inactiveValueRegExp = new RegExp(`^# ${tmpObj.value}(\x20)?=`)
    let defaultValue: string | undefined
    const valueList = envContentArr.filter(item => item.match(activeValueRegExp) || item.match(inactiveValueRegExp)).map(item => {
        if (item.match(activeValueRegExp)) defaultValue = item.split('=')[1]
        return item.split('=')[1]
    })

    const valueChoices = valueList.map(item => ({
        name: item.replace(/'/g, ''),
        value: item,
    }))
    console.log('valueChoices', valueChoices)
    const selectedValue = await select({
        message: '选择' +  envName,
        choices: valueChoices,
        default: defaultValue
    })
    const loading = ora('环境修改中...').start()
    // console.log(chalk.blue('Hello world!'));
    // chalk.level = 1
    // console.log(chalk.blue('环境修改中...'))
    let hasChangeSucceed = false
    for (let i = 0; i < envContentArr.length; i++) {
        const line = envContentArr[i];
        const activeValueMatchRes = line.match(activeValueRegExp)
        const selectValueMatchRes = line.match(new RegExp(`${tmpObj.value}(\x20)?=(\x20)?${selectedValue}`))
        if (!selectValueMatchRes && activeValueMatchRes) {
            envContentArr[i] = `# ${line}`
        } else if (selectValueMatchRes) {
            envContentArr[i] = line.replace('# ', '')
            hasChangeSucceed = true
        }
    }
    fs.writeFileSync(envPath, envContentArr.join('\n'));
    loading.succeed('环境修改成功, 请重启项目')
    // console.log(chalk.green('环境修改成功'))
}

export default actionChanegEnv