import * as sst from '@serverless-stack/resources'

export default class DbStorer extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)
    const bucket = new sst.Bucket(this, 'i-hate-mondays')

    // Adding Lambdas
    const VideoPublisher = new sst.Function(this, 'VideoPublisher', {
      handler: 'src/handlers.tweetHateMondayVideo',
      environment: { UPLOADS_BUCKET_NAME: bucket.bucketName },
      permissions: [bucket]
    })

    // Cron jobs
    if (scope.local || scope.stage === 'live') {
      // Will run every hour
      new sst.Cron(this, 'VideoPublisherCron', {
        schedule: 'cron(0 13 ? * 2 *)',
        job: VideoPublisher
      })
    }
  }
}