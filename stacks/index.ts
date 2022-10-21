import * as sst from '@serverless-stack/resources'
import { buildEnvVarObject } from './helpers/build-env-object'
import { vars as envVarsCommon } from './helpers/common-envs'
import BotStack from './Bot'

export default function main (app: sst.App): void {
  // Adding default settings to lambdas
  app.setDefaultFunctionProps({
    timeout: 30,
    runtime: 'nodejs14.x',
    bundle: {
      format: 'cjs',
    },
    environment: {
      ...buildEnvVarObject(envVarsCommon),
      DEBUG: `${app.name}:*`,
      PROJECT_NAME: app.name,
      STAGE: app.stage
    }
  })

  new BotStack(app, 'bot')
}
