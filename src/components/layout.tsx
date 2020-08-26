/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Header from './header';
import './layout.scss';
import LinkCollection, { ILink } from './link-collection';
import Section from './section';

const Layout: React.FC<{ color?: 'white' }> = ({ children, color }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const pages: ILink[] = [
    {
      label: 'blog',
      external: true,
      url: 'https://medium.com/@ciesielskico/',
    },
    {
      label: 'github',
      external: true,
      url: 'https://github.com/ciesielskico/',
    },
    {
      label: 'linkedin',
      external: true,
      url: 'https://www.linkedin.com/in/ciesielskico/',
    },
    {
      label: 'stackoverflow',
      external: true,
      url: 'https://stackoverflow.com/users/1808126/alexander-ciesielski/',
    },
  ];

  return (
    <div className={`ciesielskico-container ${color ? `section-color--${color}` : ''}`}>
      <Header pages={pages} siteTitle={data.site.siteMetadata.title} />

      <main>{children}</main>

      <footer>
        <Section color="black" height="auto" horizontalAlignment="left" textAlignment="left">
          <div className="d-flex flex-column" style={{ marginTop: '-45px' }}>
            <LinkCollection classes="my-2 mx-4 display-4 h5 menu-item" pages={pages} />
          </div>
        </Section>
      </footer>
    </div>
  );
};

export default Layout;
