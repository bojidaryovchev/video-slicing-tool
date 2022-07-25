export interface Video {
  /**
   * Sets the start time. You can specify the value in seconds or in date time format.
   * @param time the time in seconds or a date time string
   * @example
   * ```ts
   * // Seconds
   * video.setVideoStartTime(13)
   * // Date time format
   * video.setVideoStartTime('00:00:13')
   * ```
   */
  setVideoStartTime(time: number | string): Video;

  /**
   * Sets the duration. You can specify the value in seconds or in date time format.
   * @param duration the time in seconds or a date time string
   * @example
   * ```ts
   * // Seconds
   * video.setVideoDuration(100)
   * // Date time format
   * video.setVideoDuration('00:01:40')
   * ```
   */
  setVideoDuration(duration: number | string): Video;

  /**
   * After setting the desired parameters have to start the conversion process.
   * To do this you must call the function 'save'.
   * @param destinationFileName The final destination of the file
   * @param cb A callback function for the path of the new file
   * @returns The path to the newly created file, or void if the callback was defined
   */
  save(destinationFileName: string): Promise<string>;
  save(
    destinationFileName: string,
    cb: (err: Error, file: string) => void
  ): void;
}
