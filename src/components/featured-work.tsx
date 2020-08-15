/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import ResponsiveImage from './responsive-image';

export interface IProject {
  name: string;
  url: string;
  description?: string;
  short_description?: string;
}

const FeaturedWork: React.FC<IProject> = ({ name, url, description, short_description }) => {
  return (
    <div className="row align-items-center">
      <div className="col-lg-8">
        <ResponsiveImage name={name} zoom={true} publicURL={url}></ResponsiveImage>
      </div>
      <div className="col-lg-4">
        <ReactMarkdown className="m-4 blockquote animated fadeIn" source={description || short_description} />
      </div>
    </div>
  );
};

export default FeaturedWork;
