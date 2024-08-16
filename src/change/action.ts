import fs from 'fs'
import path from 'path'
import { select } from '@inquirer/prompts'
// import { EnvType } from './type'
import ora from 'ora'
import { cwd } from 'node:process'

// 获得当前node环境执行路径（比如在udm下吗输命令，就udm的路径）
// console.log(`Current directory: ${cwd()}`);

const actionChanegEnv = async () => {
  const configPath: string = path.join(cwd(), './change-env-runtime.config.js')
  const config: {
    envPath: string
    tmpList?: Array<{
      name: string
      value: string
    }>
  } = require(configPath) ?? {
    envPath: './.env',
  }
  const envPath: string = path.join(cwd(), config.envPath)
  // console.log('config', config)

  const envContent: string = fs.readFileSync(envPath, 'utf-8')
  const envContentArr: string[] = envContent.split(/\n/)

  const defaultTmpList = envContentArr
    .filter((item) => item.includes('='))
    .map((item) => {
      const property = item.split('=')[0].replace(/#(\x20)?/, '')
      return {
        name: property,
        value: property,
      }
    })
  config.tmpList = config.tmpList ?? defaultTmpList

  // 选择要解析的字段
  const envName: string = await select({
    message: '选择要修改的字段',
    choices: config.tmpList.map((item) => ({
      name: item.name,
      value: item.name,
      disabled: false,
    })),
    default: config.tmpList[0].name,
  })

  // 根据env文件解析出泳道列表和测试环境列表
  const tmpObj = config.tmpList.find((item) => item.name === envName)
  const activeValueRegExp = new RegExp(`^${tmpObj!.value}(\x20)?=`)
  const inactiveValueRegExp = new RegExp(`^#(\x20)?${tmpObj!.value}(\x20)?=`)
  let defaultValue: string | undefined
  const valueList = envContentArr
    .filter(
      (item) =>
        item.match(activeValueRegExp) || item.match(inactiveValueRegExp),
    )
    .map((item) => {
      if (item.match(activeValueRegExp)) defaultValue = item.split('=')[1]
      return item.split('=')[1]
    })

  const valueChoices = valueList.map((item) => ({
    name: item.replace(/'/g, ''),
    value: item,
  }))
  // console.log('valueChoices', valueChoices)
  const selectedValue = await select({
    message: '选择' + envName,
    choices: valueChoices,
    default: defaultValue,
  })
  const loading = ora('环境修改中...').start()
  // console.log(chalk.blue('环境修改中...'))
  for (let i = 0; i < envContentArr.length; i++) {
    const line = envContentArr[i]
    const activeValueMatchRes = line.match(activeValueRegExp)
    const selectValueMatchRes = line.match(
      new RegExp(`${tmpObj!.value}(\x20)?=(\x20)?${selectedValue}`),
    )
    if (!selectValueMatchRes && activeValueMatchRes) {
      envContentArr[i] = `# ${line}`
    } else if (selectValueMatchRes) {
      envContentArr[i] = line.replace(/#(\x20)?/, '')
    }
  }
  fs.writeFileSync(envPath, envContentArr.join('\n'))
  loading.succeed('环境修改成功, 请重启项目')
  // console.log(chalk.green('环境修改成功'))
}

export default actionChanegEnv
