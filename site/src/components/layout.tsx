/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import Header from './header';
import './layout.scss';
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

  const pages = ['company', 'contact'];

  return (
    <>
      <div className={`${color ? `section-color--${color}` : ''}`}>
        <Header pages={pages} siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer>
          <Section color="black" height="auto" horizontalAlignment="left" textAlignment="left">
            <div className="d-flex flex-column" style={{ marginTop: '-45px' }}>
              {pages.map((page, index) => (
                <Link key={index} className="my-2 mx-4 display-4 h5 menu-item" to={page}>
                  {page}
                </Link>
              ))}
            </div>
          </Section>
        </footer>
      </div>
    </>
  );
};

export default Layout;
