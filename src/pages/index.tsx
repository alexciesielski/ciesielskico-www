import { graphql, Link, PageProps } from 'gatsby';
import React, { useEffect } from 'react';
import Typed from 'typed.js';
import FeaturedWork from '../components/featured-work';
import Layout from '../components/layout';
import ResponsiveImage, { IResponsiveImage } from '../components/responsive-image';
import Section from '../components/section';
import SEO from '../components/seo';
import { VideoBackground } from '../components/video-background';
import './index.scss';

export const query = graphql`
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
        media {
          mime
          height
          width
          url
        }
      }
    }
    allStrapiClient {
      nodes {
        name
        logo {
          publicURL
        }
        url
      }
    }
  }
`;

type DataProps = {
  strapiHomePage: {
    title: string;
    description: string;
    long_description: string;
    invitation: string;
    project: {
      name: string;
      description: string;
      media: {
        mime: string;
        height: number;
        width: number;
        url: string;
      }[];
    };
  };
  allStrapiClient: {
    nodes: Array<{
      name: string;
      logo: IResponsiveImage;
      url: string;
    }>;
  };
  site: {
    siteMetadata: {
      author: string;
      title: string;
      description: string;
    };
  };
};

const IndexPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  useEffect(() => {
    new Typed('#typed', {
      stringsElement: '#typed-strings',
      typeSpeed: 40,
      startDelay: 1250,
      backDelay: 1000,
      onBegin: () =>
        setTimeout(() => {
          const cursor = document.querySelector('.typed-cursor');
          if (cursor) {
            cursor.classList.add('h1');
            cursor.classList.add('display-1');
          }
        }),
      onComplete: () =>
        setTimeout(() => {
          const cursor = document.querySelector('.typed-cursor');
          if (cursor) {
            cursor.remove();
          }
        }, 1050),
    } as any);
  });

  useEffect(() => {
    const animatables = document.querySelectorAll('.animated');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('fadeIn');
          observer.unobserve(entry.target);
        }
      });
    });

    animatables.forEach((animated) => observer.observe(animated));
  });

  const clients = data.allStrapiClient.nodes;
  const clientCount = clients.length;
  const defaultChunksize = 3;
  const chunkSize =
    clientCount % 5 === 0 ? 5 : clientCount % 4 === 0 ? 4 : clientCount % 3 === 0 ? 3 : defaultChunksize;
  const clientChunks: DataProps['allStrapiClient']['nodes'][] = clients
    .map((_, index) => clients.slice(index * chunkSize, (index + 1) * chunkSize))
    .filter((arr) => arr.length > 0);

  return (
    <Layout>
      <SEO title="Home" />
      <Section
        height="large"
        width="wide"
        horizontalAlignment="left"
        textAlignment="left"
        verticalAlignment="bottom"
        background={<VideoBackground />}
      >
        <div className="row">
          <div className="col">
            <h1 id="typed" className="d-inline display-1"></h1>
            <div id="typed-strings" style={{ display: 'none' }}>
              <span>I create frontends.</span>
              <span>I build backends.</span>
              <span>I do devops.</span>
              <span>I write code.</span>
            </div>
          </div>
        </div>
      </Section>

      <Section header={data.site.siteMetadata.author} height="medium">
        <div className="row">
          <div className="col">
            <img
              className="rounded-circle"
              src="https://media-exp1.licdn.com/dms/image/C4E35AQG2MFYvOm183Q/profile-framedphoto-shrink_200_200/0?e=1597564800&v=beta&t=NvhxPEYkCMsOqyivt7xwYcnpZYTK5KkkfmvVLdDrqQU"
              alt=""
            />
            <h3 className="m-4 animated">{data.site.siteMetadata.description}</h3>
            <hr />
            <h4 className="m-4 animated delay-1s">
              Having started coding at the age of 11 it has always been my biggest passion. In 2010 I commercially
              started creating websites and have been doing it ever since.
            </h4>
            <h4 className="m-4 animated delay-2s">
              I describe myself as a full stack developer who specializes in creating beautiful and intuitive frontends.
            </h4>
            <h4 className="m-4 animated delay-3s">
              I have extensive experience in building enterprise web-apps and form-based applications with complex
              validation and business-logic to manage your data.
            </h4>
            <Link className="m-4 btn btn-pill animated delay-4s" to="/about">
              Learn More
            </Link>
          </div>
        </div>
      </Section>

      <Section header="Who I've worked with" height="small" width="medium" color="white">
        {clientChunks.map((clientChunk, idx1) => (
          <div className="clients row mt-4 align-items-center justify-content-around" key={idx1}>
            {clientChunk
              .filter((client) => client.logo)
              .map((client, idx2) => (
                <div
                  key={idx2}
                  className={`client col-sm-${12 / clientChunk.length} animated delay-${idx1 + idx2}s`}
                  style={{ maxWidth: '200px' }}
                >
                  <div className="p-4">
                    <a href={client.url}>
                      <ResponsiveImage name={client.name} {...client.logo} />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </Section>

      <Section header="Featured work" height="medium">
        <div className="animated">
          <FeaturedWork url={data.strapiHomePage.project.media[0].url} {...data.strapiHomePage.project} />
        </div>
      </Section>

      <Section color="white" height="small">
        <div className="row" style={{ paddingTop: '3vw' }}>
          <div className="col">
            <div className="display-4 my-4 animated">I'd love to create your app.</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link className="btn btn-pill my-4 animated delay-1s" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default IndexPage;
