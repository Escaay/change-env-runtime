import type { Command } from 'commander'
import chanegEnvAction from './action'
const changeEnv = (program: Command) => {
  program
    .command('start')
    .description('要切换的环境名称')
    .action(() => {
      chanegEnvAction()
    })
}
export default changeEnv
