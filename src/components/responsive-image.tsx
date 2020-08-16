/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import './responsive-image.scss';

export interface IResponsiveImage {
  publicURL?: string;
  childImageSharp?: {
    resize?: {
      src: string;
      height?: number;
    };
    resolutions?: {
      src: string;
      height?: number;
    };
    sizes?: {
      height?: number;
      presentationWidth: number;
      presentationHeight: number;
      base64?: string;
      src?: string;
    };
  };
}

const ResponsiveImage: React.FC<{ name: string; zoom?: boolean } & IResponsiveImage> = ({
  name,
  zoom,
  publicURL,
  childImageSharp,
}) => {
  let src = publicURL;

  if (childImageSharp) {
    const { sizes, resize, resolutions } = childImageSharp;
    if (sizes) {
      src = sizes.src || sizes.base64;
    } else if (resolutions) {
      src = resolutions.src;
    } else if (resize) {
      src = resize.src;
    }
  }

  return (
    <div className={`responsive-image ${zoom ? 'zoom-on-hover' : ''}`.trim()}>
      <img className="img-fluid rounded" title={name} src={src} alt={name} loading="lazy" />
    </div>
  );
};

export default ResponsiveImage;
