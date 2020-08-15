require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `ciesielski.co`,
    description: `I'm a fullstack developer who focuses on creating beautiful user interfaces with perfect UX.`,
    author: `Alexander Ciesielski`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `media`,
        path: `${__dirname}/src/media`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ciesielski.co`,
        short_name: `ciesielski.co`,
        start_url: `/`,
        background_color: `#303841`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/media/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.NODE_ENV === 'production' ? `http://api.ciesielski.co` : 'http://localhost:1338',
        contentTypes: [`project`, `client`, `skills`],
        singleTypes: [`home-page`, `contact`, `about-me`],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: process.env.NODE_ENV !== 'production', // Print removed selectors and processed file names
        develop: false, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        purgeOnly: ['styles'], // Purge only these files/folders
        ignore: ['./src/styles/_buttons.scss'], // Ignore files/folders
        whitelist: ['section-color--dark', 'section-color--black', 'section-color--white'], // Don't remove this selector
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
