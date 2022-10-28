import { getVideoFromS3, uploadVideo, tweetVideo } from './services';

export async function tweetHateMondayVideo (event) {
  const bucketName = process.env.UPLOADS_BUCKET_NAME;
  const videoKey = 'i-hate-mondays.mp4';

  const buffer = await getVideoFromS3(videoKey, bucketName);
  
  const mediaId = await uploadVideo(buffer);
  await tweetVideo('Odeio segunda feira', mediaId);
}
