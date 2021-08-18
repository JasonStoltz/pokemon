import { useSearchkitVariables } from '@searchkit/client'
import { gql, useQuery } from '@apollo/client'

import {
  FacetsList,
  SearchBar,
  Pagination,
  ResetSearchButton,
  SelectedFilters,
  SortingSelector
} from '@searchkit/elastic-ui'

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer
} from '@elastic/eui'

const QUERY = gql`
query resultSet($query: String, $filters: [SKFiltersSet], $page: SKPageInput, $sortBy: String) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
          }

          ... on NumericRangeSelectedFilter {
            min
            max
          }

          ... on ValueSelectedFilter {
            value
          }
        }
        sortOptions {
          id
          label
        }
        query
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
        }
        sortedBy
        items {
          ... on ResultHit {
            id
            fields {
              name,
              number,
              total,
              hp,
              attack,
              defenese,
              sp_attack,
              sp_def,
              speed,
              generation,
              legendary,
              image,
              url,
              id
            }
          }
        }
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
        }
      }
    }
  }
`

export const HitsList = ({ data }) => (
  <>
    {data?.results.hits.items.map((hit) => (
      <EuiFlexGroup gutterSize="xl" key={hit.id}>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem>
              <a href={hit.fields.url} target="_blank" rel="noreferrer" >
                <img src={hit.fields.image} alt="Image of pokemon" style={{ maxWidth: '200px' }}/>
              </a>
            </EuiFlexItem>
            <EuiFlexItem grow={4}>
              <EuiTitle size="xs">
                <h6>
                <a href={hit.fields.url} target="_blank" rel="noreferrer" >
                  {hit.fields.name}
                </a>
                </h6>
              </EuiTitle>
              <ul>
                <li>{hit.fields.number}</li>
                <li>{hit.fields.total}</li>
                <li>{hit.fields.hp}</li>
                <li>{hit.fields.attack}</li>
                <li>{hit.fields.defenese}</li>
                <li>{hit.fields.sp_attack}</li>
                <li>{hit.fields.sp_def}</li>
                <li>{hit.fields.speed}</li>
                <li>{hit.fields.generation}</li>
                <li>{hit.fields.legendary}</li>
                <li>{hit.fields.image}</li>
              </ul>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    ))}
  </>
)

const Search = () => {
  const variables = useSearchkitVariables()
  const { previousData, data = previousData, loading } = useQuery(QUERY, {
    variables
  })
  const Facets = FacetsList([])
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SearchBar loading={loading} />
        <EuiHorizontalRule margin="m" />
        <SortingSelector data={data?.results} loading={loading} />
        <EuiSpacer />
        <Facets data={data?.results} loading={loading} />
      </EuiPageSideBar>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <SelectedFilters data={data?.results} loading={loading} />
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <ResetSearchButton loading={loading} />
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="s">
                <h2>{data?.results.summary.total} Results</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <HitsList data={data} />
            <EuiFlexGroup justifyContent="spaceAround">
              <Pagination data={data?.results} />
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default Search
