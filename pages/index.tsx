import { gql, useQuery } from '@apollo/client';
import { useSearchkitVariables, withSearchkit } from '@searchkit/client'
import withApollo from '../lib/withApollo';

const QUERY = gql`
    query resultSet($query: String, $filters: [SKFiltersSet], $page: SKPageInput) {
      results(query: $query, filters: $filters, page: $page) {
        hits {
          items {
            id
          }
        }
      }
    }
  `

const Index = () => {
  const variables = useSearchkitVariables()
  const { previousData, data = previousData, loading } = useQuery(QUERY, { variables })

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return <>
    {data.results.hits.items.map((item: any) => {
      return (
        <div key={item.id}>hit id: {item.id}</div>
      )
    })}
  </>;
};

export default withApollo(withSearchkit(Index));