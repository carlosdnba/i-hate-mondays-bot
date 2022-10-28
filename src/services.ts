import aws from 'aws-sdk';
import { TwitterApi } from 'twitter-api-v2';

const s3 = new aws.S3()

export const getVideoFromS3 = async (key, bucketName): Promise<Buffer> => {
  const { Body } = await s3.getObject({
    Bucket: bucketName,
    Key: key
  }).promise()
  return Body as Buffer
}

const twitter = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || 'string',
  appSecret: process.env.TWITTER_API_KEY_SECRET || 'string',
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN || 'string',
  accessSecret: process.env.TWITTER_API_ACCESS_SECRET || 'string'
})

export const uploadVideo = async (buffer: Buffer) => {
  const mediaId = await twitter.readWrite.v1.uploadMedia(buffer, {
    mimeType: 'video/mp4',
  });

  return mediaId
}

export const tweetVideo = async (status: string, mediaId: string) => {
  const response = await twitter.readWrite.v1.tweet(status, {
    media_ids: mediaId
  })
  return response
}
