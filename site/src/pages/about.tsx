import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import FeaturedWork from '../components/featured-work';
import Layout from '../components/layout';
import Section from '../components/section';
import SEO from '../components/seo';
import './company.scss';

const Company: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      strapiCompany {
        project {
          short_description
          media {
            url
          }
        }
        description
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Company" />
      <Section height="large" horizontalAlignment="left" verticalAlignment="bottom" textAlignment="left" width="narrow">
        <div className="row">
          <div className="col">
            <ReactMarkdown className="company-description" source={data.strapiCompany.description} />
          </div>
        </div>
      </Section>
      <Section color="white">
        <FeaturedWork url={data.strapiCompany.project.media[0].url} {...data.strapiCompany.project} />
      </Section>
    </Layout>
  );
};

export default Company;
