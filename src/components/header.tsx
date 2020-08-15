import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import './header.scss';

const Header: React.FC<{ siteTitle: string; pages: string[]; color?: string }> = ({ siteTitle, pages, color }) => {
  // https://lxieyang.github.io/blogs/tech-2018-08-18-reactstrap-gatsby-auto-hiding-navbar-trick/
  // https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      const document = window.document || {};
      const maxScroll = document.body.clientHeight - window.innerHeight;
      let currentScrollPos = window.pageYOffset;
      const scrollingUp =
        (maxScroll > 0 && prevScrollpos > currentScrollPos && prevScrollpos <= maxScroll) ||
        (maxScroll <= 0 && prevScrollpos > currentScrollPos) ||
        (prevScrollpos <= 0 && currentScrollPos <= 0);

      const header = document.querySelector('header')!;
      if (scrollingUp) {
        header.style.top = '0';

        if (currentScrollPos !== 0) {
          header.style.backgroundColor = 'var(--body-bg)';
        } else {
          if (!color) {
            header.style.backgroundColor = 'transparent';
          }
        }
      } else {
        header.style.top = '-10rem';
        header.style.backgroundColor = 'transparent';
      }

      prevScrollpos = currentScrollPos;
    };
  });

  const [menuResponsive, setMenuResponsive] = useState(false);

  return (
    <header>
      <nav className={`topnav d-flex align-items-center ${menuResponsive ? ' responsive' : ''}`}>
        <Link className="home" to="/">
          <h1 className="m-0 display-4">{siteTitle}</h1>
        </Link>
        {pages.map((page, index) => (
          <Link key={index} className="my-0 mx-4 h5 menu-item" to={page}>
            {page}
          </Link>
        ))}

        <a href="#" className={`my-0 mx-4 icon`} onClick={() => setMenuResponsive(!menuResponsive)}></a>
      </nav>
    </header>
  );
};

export default Header;
