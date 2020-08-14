// If you don't want to use TypeScript you can delete this file!
import { Link, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import Section from '../components/section';
import SEO from '../components/seo';

const Page404: React.FC<PageProps<{}>> = ({}) => (
  <Layout color="white">
    <SEO title="Page Not Found" />
    <Section color="white" textAlignment="left" width="narrow">
      <div className="d-flex flex-column justify-content-between align-start">
        <h3 className="m-0 py-4">Page Not Found</h3>
        <Link to="/" className="btn btn-pill align-self-start">
          Return to homepage
        </Link>
      </div>
    </Section>
  </Layout>
);

export default Page404;
