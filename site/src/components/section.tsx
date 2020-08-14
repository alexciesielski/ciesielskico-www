import PropTypes from 'prop-types';
import React from 'react';
import './section.scss';

const Section: React.FC<{
  header?: string;
  height?: string;
  width?: string;
  verticalAlignment?: string;
  horizontalAlignment?: string;
  textAlignment?: string;
  background?: React.ElementRef<any>;
  color?: string;
}> = ({
  children,
  height,
  width,
  verticalAlignment,
  horizontalAlignment,
  textAlignment,
  background,
  color,
  header,
}) => (
  <section
    className={`
      page-section
      content-width--${width} 
      section-height--${height} 
      vertical-alignment--${verticalAlignment} 
      horizontal-alignment--${horizontalAlignment}
      section-color--${color ? color : 'dark'}
      text-alignment--${textAlignment ? textAlignment : 'center'} 
    `}
  >
    <div className="section-background">{background}</div>
    <div className={`container-fluid m-0`}>
      {header ? (
        <div className="row">
          <div className="col">
            <h3 className="display-4 p-4">{header}</h3>
          </div>
        </div>
      ) : (
        <></>
      )}
      {children}
    </div>
  </section>
);

Section.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  verticalAlignment: PropTypes.string,
  horizontalAlignment: PropTypes.string,
};

Section.defaultProps = {
  height: `medium`,
  width: `medium`,
  horizontalAlignment: `center`,
  verticalAlignment: `middle`,
};

export default Section;
