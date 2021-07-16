# gatsby-transformer-technology-radar
Gatsby plugin for displaying a technology radar on your website inspired by https://github.com/thoughtworks/build-your-own-radar.

## Install
This plugin can be installed by using:

```
npm install --save @valiton/gatsby-transformer-technology-radar
```

## How to use
This plugin requires your technology radar data to be present as a node created by gatsby-transformer-csv, so if you added 
your technology radar csv file as src/techradar/radar.csv use the following configuration:

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'radar',
        path: 'src/techradar'
    },
    {
      resolve: 'gatsby-transformer-csv',
      options: {
        nodePerFile: true
      }
    },
    {
      resolve: '@valiton/gatsby-transformer-technology-radar',
      options: {
        nodeType: 'RadarCsv',
        radarName: 'My technology radar',
        layout: {ringWidth: 16, idealItemWidth: 22, minItemWidth: 11, size: 520} 
      }
    },
  ]
};
```
Specifying the layout is optional.

## License
MIT
