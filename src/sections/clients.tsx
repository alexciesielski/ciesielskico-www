import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ResponsiveImage from '../components/responsive-image';
import Section from '../components/section';

type DataProps = {
  allStrapiClient: {
    nodes: Array<{
      name: string;
      logo: { childImageSharp: { resize: { src: string } } };
      url: string;
    }>;
  };
};

const Clients: React.FC<{}> = ({}) => {
  const { allStrapiClient } = useStaticQuery(graphql`
    query ClientsQuery {
      allStrapiClient {
        nodes {
          name
          logo {
            childImageSharp {
              resize(width: 150) {
                src
              }
            }
          }
          url
        }
      }
    }
  `);

  const clients = allStrapiClient.nodes as DataProps['allStrapiClient']['nodes'];
  const clientCount = clients.length;
  const defaultChunksize = 3;
  const chunkSize =
    clientCount % 5 === 0 ? 5 : clientCount % 4 === 0 ? 4 : clientCount % 3 === 0 ? 3 : defaultChunksize;
  const clientChunks = clients
    .map((_, index) => clients.slice(index * chunkSize, (index + 1) * chunkSize))
    .filter((arr) => arr.length > 0);

  return (
    <Section header="Who I've worked with" height="small" width="medium" color="white">
      {clientChunks.map((clientChunk, idx1) => (
        <div className="clients row mt-4 align-items-center justify-content-around" key={idx1}>
          {clientChunk
            .filter((client) => client.logo)
            .map((client, idx2) => (
              <div
                key={idx2}
                className={`client col-sm-${12 / clientChunk.length} animated delay-${idx1 + idx2}s`}
                style={{ maxWidth: '200px' }}
              >
                <div className="p-4">
                  <a href={client.url}>
                    <ResponsiveImage name={client.name} {...client.logo} />
                  </a>
                </div>
              </div>
            ))}
        </div>
      ))}
    </Section>
  );
};

export default Clients;
