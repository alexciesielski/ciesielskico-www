import { graphql, useStaticQuery } from 'gatsby';
import React, { useLayoutEffect } from 'react';
import { scaleVideo } from '../functions/scale-video';
import './video-background.scss';

export const VideoBackground: React.FC = () => {
  const { strapiHomePage } = useStaticQuery(graphql`
    {
      strapiHomePage {
        bg {
          publicURL
          childImageSharp {
            sizes(toFormatBase64: NO_CHANGE, base64Width: 350) {
              presentationWidth
              presentationHeight
              base64
            }
          }
        }
        bg_video {
          url
          mime
        }
      }
    }
  `);

  useLayoutEffect(() => {
    window.addEventListener('resize', scaleVideo);
    return () => window.removeEventListener('resize', scaleVideo);
  });

  return (
    <>
      <div className="video-background">
        <img alt="bg.jpg" className="custom-fallback-image" src={strapiHomePage.bg.childImageSharp.base64} />
        <video autoPlay muted loop className="bg-video" onLoadedMetadata={() => scaleVideo()}>
          {strapiHomePage.bg_video.map((video, index) => (
            <source key={index} src={video.url} type={video.mime} />
          ))}
        </video>
      </div>
    </>
  );
};
