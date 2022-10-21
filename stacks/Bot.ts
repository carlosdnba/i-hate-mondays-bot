import * as sst from '@serverless-stack/resources'

export default class DbStorer extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    // Adding Lambdas
    new sst.Function(this, 'PhotoPublisher', {
      handler: 'src/handlers/bot.handler'
    })

    // Cron jobs
    if (scope.local || scope.stage === 'live') {
      // Will run every hour
      // new sst.Cron(this, 'UpdateEntriesCron', {
      //   schedule: 'cron(0 * ? * * *)',
      //   job: UpdateNewEntires
      // })
    }
  }
}