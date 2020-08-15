// If you don't want to use TypeScript you can delete this file!
import { graphql, PageProps } from 'gatsby';
import React from 'react';
import ContactForm, { strapiContact } from '../components/contact-form';
import Layout from '../components/layout';
import Section from '../components/section';
import SEO from '../components/seo';

type DataProps = {
  strapiContact: strapiContact;
};

const Contact: React.FC<PageProps<DataProps>> = ({ data }) => (
  <Layout color="white">
    <SEO title="Contact" />
    <Section color="white" textAlignment="left">
      <h3 className="m-0 py-4">{data.strapiContact.title}</h3>
      <ContactForm data={data.strapiContact}></ContactForm>
    </Section>
  </Layout>
);

export default Contact;

export const query = graphql`
  {
    strapiContact {
      email
      cta
      title
    }
  }
`;
