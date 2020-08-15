import { Link } from 'gatsby';
import React from 'react';

export interface ILink {
  label: string;
  external?: boolean;
  url?: string;
}

const LinkCollection: React.FC<{ pages: ILink[]; classes: string }> = ({ pages, classes }) => (
  <>
    {pages.map((page) =>
      page.external && page.url ? (
        <a key={page.label} className={classes} href={page.url}>
          {page.label}
        </a>
      ) : (
        <Link key={page.label} className={classes} to={page.label}>
          {page.label}
        </Link>
      )
    )}
  </>
);
export default LinkCollection;
