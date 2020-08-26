function findPlayerAspectRatio(videoPlayer: HTMLVideoElement) {
  const width = videoPlayer.clientWidth;
  const height = videoPlayer.clientHeight;
  return width / height;
}

export function scaleVideo() {
  if (!document || !window) {
    return;
  }

  const scaleFactor = 1;
  const videoPlayer = document.querySelector('video')!;
  const videoAspectRatio = findPlayerAspectRatio(videoPlayer);

  if (videoPlayer) {
    const width = (videoPlayer.parentNode as any).clientWidth;
    const height = (videoPlayer.parentNode as any).clientHeight;
    const ratio = width / height;
    let scaledWidth = 0;
    let scaledHeight = 0;

    if (ratio > videoAspectRatio) {
      scaledWidth = width * scaleFactor;
      scaledHeight = (width * scaleFactor) / videoAspectRatio;
    } else if (videoAspectRatio > ratio) {
      scaledWidth = height * scaleFactor * videoAspectRatio;
      scaledHeight = height * scaleFactor;
    } else {
      scaledWidth = width * scaleFactor;
      scaledHeight = height * scaleFactor;
    }

    videoPlayer.style.width = scaledWidth + 'px';
    // videoPlayer.style.height = scaledHeight + 'px';
    videoPlayer.style.left = 0 - (scaledWidth - width) / 2 + 'px';
    videoPlayer.style.top = 0 - (scaledHeight - height) / 2 + 'px';

    // debugger;
  }
}
