module.exports = {
    siteMetadata: {
        title: `Technology radar sample site`,
        siteUrl: `https://www.yourdomain.tld`
    },
    plugins: [
        "gatsby-plugin-image",
      "gatsby-plugin-react-helmet",
      "gatsby-transformer-remark",
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      {
        resolve: 'gatsby-plugin-sass',
        options: {
          cssLoaderOptions: {
            camelCase: false,
          },
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
            "name": "images",
            "path": "./src/images/"
        },
        __key: "images"
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
            "name": "pages",
            "path": "./src/pages/"
        },
        __key: "pages"
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `radar`,
          path: `./src/techradar`
        },
        __key: "techradar"
      },
      {
        resolve: `gatsby-transformer-csv`,
        options: {
            nodePerFile: true
        }
      },
      {
        resolve: `@valiton/gatsby-transformer-technology-radar`,
        options: {
          nodeType: `RadarCsv`,
          radarName: `Valiton Technology Radar`,
          layout: {size: 800, ringWidth: 25}
        }
      },
    ]
};
