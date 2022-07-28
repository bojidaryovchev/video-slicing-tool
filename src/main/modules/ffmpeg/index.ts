/* eslint-disable no-new */
/* eslint-disable new-cap */
import ffmpeg from 'ffmpeg';
import { Video } from './video.interface';

export const ffmpegLoadVideo = async (path: string): Promise<Video> => {
  return new Promise<Video>((resolve, reject) => {
    try {
      new ffmpeg(path, (err, video) => {
        if (!err) {
          resolve(video);
        } else {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
