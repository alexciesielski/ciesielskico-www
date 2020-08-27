import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Typed from 'typed.js';
import FeaturedWork from '../components/featured-work';
import Section from '../components/section';
import { VideoBackground } from '../components/video-background';
import Clients from '../sections/clients';
import Skills from '../sections/skills';
import './home-page.scss';

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
  };
  site: {
    siteMetadata: {
      author: string;
      title: string;
      description: string;
    };
  };
};

const HomePage: React.FC<{}> = () => {
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

  const [isTyping, setTyping] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      setTyping(true);
      new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 40,
        startDelay: 1500,
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
    }
  });

  useLayoutEffect(() => {
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

  const [width, setVW] = useState(640);

  useLayoutEffect(() => {
    const vw = Math.max(window.innerWidth || 640);
    setVW(vw);
  });

  return (
    <>
      <Section
        height="large"
        width="wide"
        horizontalAlignment="left"
        textAlignment="left"
        verticalAlignment="bottom"
        background={width >= 640 && <VideoBackground />}
      >
        <div className="row">
          <div className="col">
            <h2 id="typed" className="d-inline display-1"></h2>
            <div id="typed-strings" style={{ display: 'none' }}>
              <span>I create frontends.</span>
              <span>I build backends.</span>
              <span>I do devops.</span>
              <span>I write code.</span>
            </div>
          </div>
        </div>
      </Section>

      <Section header={data.site.siteMetadata.author} height="medium" width="narrow">
        <div className="row">
          <div className="col">
            <h3 className="m-4 animated">{data.site.siteMetadata.description}</h3>
            <hr className="d-block my-4" />
            <h4 className="m-4 animated delay-1s">
              Having started coding at the age of 11 it has always been my biggest passion.
            </h4>
            <h4 className="m-4 animated delay-1s">
              In 2010 I started commercially creating websites and have been doing it ever since.
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

      <Clients></Clients>

      <Skills></Skills>

      <Section header="Featured work" height="medium" color="white">
        <div className="animated">
          <FeaturedWork url={data.strapiHomePage.project.media[0].url} {...data.strapiHomePage.project} />
        </div>
      </Section>

      <Section color="black" height="small">
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
    </>
  );
};

export default HomePage;
