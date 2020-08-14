// If you don't want to use TypeScript you can delete this file!
import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { strapiContact } from '../components/contact-form';
import Layout from '../components/layout';
import Section from '../components/section';
import SEO from '../components/seo';

type DataProps = {
  strapiContact: strapiContact;
};

const ContactSuccess: React.FC<PageProps<DataProps>> = ({ data }) => (
  <Layout color="white">
    <SEO title="Contact" />
    <Section color="white" width="narrow" textAlignment="left">
      <h3 className="m-0 py-4">{data.strapiContact.title}</h3>
      <p>Thank you for contacting us.</p>
      <p>We will get in touch soon.</p>
    </Section>
  </Layout>
);

export default ContactSuccess;

export const query = graphql`
  {
    strapiContact {
      email
      cta
      title
    }
  }
`;
