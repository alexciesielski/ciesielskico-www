import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import HomePage from '../components/home-page';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SplashScreen from '../components/splash';
import { preloadAssets } from '../functions/preload-assets';

type DataProps = {
  strapiHomePage: {
    title: string;
    description: string;
    long_description: string;
    invitation: string;
    project: {
      name: string;
      description: string;
      ciesielskico_description: string;
      media: {
        mime: string;
        height: number;
        width: number;
        url: string;
      }[];
    };
    bg_video: [
      {
        url: string;
        mime: string;
      }
    ];
  };
  site: {
    siteMetadata: {
      author: string;
      title: string;
      description: string;
    };
  };
};

const IndexPage: React.FC<PageProps<DataProps>> = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author
          title
          description
        }
      }
      strapiHomePage {
        long_description
        description
        title
        invitation
        project {
          name
          description
          ciesielskico_description
          media {
            mime
            height
            width
            url
          }
        }
        bg_video {
          url
          mime
        }
      }
    }
  `);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    preloadAssets(data.strapiHomePage.bg_video.map((video: { url: string }) => video.url)).finally(() => {
      console.log('isloaded');
      setIsLoaded(true);
    });
  });

  return (
    <Layout>
      <SEO title="Home" />

      <SplashScreen isLoaded={isLoaded}></SplashScreen>
      {isLoaded && <HomePage />}
    </Layout>
  );
};

export default IndexPage;
