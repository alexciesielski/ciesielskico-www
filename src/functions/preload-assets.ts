function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = url;
  });
}

function preloadVideo(url: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.oncanplaythrough = () => {
      resolve();
    };
    video.src = url;

    const src = document.createElement('source');
    src.src = url;

    video.appendChild(src);
  });
}

function waitForXSeconds(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

export function preloadAssets(urls: string[]) {
  return Promise.race([
    waitForXSeconds(2),
    Promise.all([
      waitForXSeconds(1),
      ...urls.map((url) => {
        if (url.endsWith('mp4') || url.endsWith('webm')) {
          return preloadVideo(url);
        }

        return preloadImage(url);
      }),
    ]),
  ]);
}
