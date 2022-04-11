import * as React from "react"
import {graphql} from "gatsby"
import Radar from "@valiton/react-technology-radar"

const IndexPage = ({data: {technologyRadar}}) => {
  return (
    <main>
      <title>Home Page</title>
      <h1>
        Techradar
      </h1>
      <Radar radar={technologyRadar.nodes[0]} size={520} backLinkText="Back" />
    </main>
  )
}

export default IndexPage

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
