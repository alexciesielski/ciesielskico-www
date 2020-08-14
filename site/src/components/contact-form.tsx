/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import './contact-form.scss';

export interface strapiContact {
  email: string;
  cta: string;
  title: string;
}

const ContactForm = (props: { data: strapiContact }) => {
  const formName = 'contact';

  return (
    <>
      <form
        autoComplete="on"
        className="white"
        name={formName}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/contact-success/"
      >
        <p className="hidden" hidden={true} role="none">
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field" />
            <input name="form-name" value={formName} readOnly />
          </label>
        </p>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="fname">First name*</label>
            <input type="text" className="form-control" name="fname" id="fname" x-autocompletetype="given-name" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lname">Last name*</label>
            <input type="text" className="form-control" name="lname" id="lname" x-autocompletetype="surname" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="email">Email*</label>
            <input type="email" className="form-control" name="email" id="email" autoComplete="email" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="message">Message*</label>
            <textarea className="form-control" id="message" name="message" />
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-cta">
              {props.data.cta}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
