# gatsby-technology-radar

Library, Gatsby plugin and React component to display a technology radar. Inspired by https://github.com/thoughtworks/build-your-own-radar.

## Install

See the README.md in the respective package directory.

## How to use

Use @valiton/technology-radar to create the data structure for your radar form a flat json array and @valiton/react-technology-radar
to display the radar.

If you are using gatsby.js use the plugin @valiton/gatsby-transformer-technology-radar and a graphql query to get the data
to use for the React component @valition/react-technology-radar

```javascript
export const query = graphql`
  query {
    technologyRadar: allTechnologyRadar(limit: 1, filter: {name: {eq: "Valiton Technology Radar"}}) {
      nodes {
        name
        quadrants {
          name
          order
          startAngle
          rings {
            maxRadius
            minRadius
            name
            order
            items {
              coordinates
              width
              number
              name
              description
              isNew
            }
          }
        }
        layout {
          size
        }
      }
    }
  }
`;
```

## Live demo

https://www.valiton.com/technology-radar

## License

MIT

## Development

### Install dependencies

```shell
npm install
```

### Run example site
```shell
npm run build -ws
cd packages/example-site
npm run develop
```

### Publish new version

```shell
npx lerna publish --no-verify-access --force-publish
```
