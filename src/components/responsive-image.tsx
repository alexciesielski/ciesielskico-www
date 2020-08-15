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
    };
    sizes?: {
      presentationWidth: number;
      presentationHeight: number;
      base64: string;
    };
  };
}

const ResponsiveImage: React.FC<{ name: string; zoom?: boolean } & IResponsiveImage> = ({
  name,
  zoom,
  publicURL,
  childImageSharp,
}) => {
  return (
    <div className={`responsive-image ${zoom ? 'zoom-on-hover' : ''}`.trim()}>
      <img
        className="img-fluid"
        title={name}
        src={
          childImageSharp
            ? childImageSharp.sizes
              ? childImageSharp.sizes.base64
              : childImageSharp.resize && childImageSharp.resize.src
            : publicURL
        }
        alt={name}
        loading="lazy"
      />
    </div>
  );
};

export default ResponsiveImage;
