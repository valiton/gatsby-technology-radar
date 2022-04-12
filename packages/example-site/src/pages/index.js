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
      <div style={{maxWidth: 1000, marginLeft: "auto", marginRight: "auto"}}>
        <Radar radar={technologyRadar.nodes[0]} size={1000} backLinkText="Back" />
      </div>
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
