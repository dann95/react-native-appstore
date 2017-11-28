import graphql from 'react-apollo/graphql';
import gql from 'graphql-tag';
import AppFragment from '../fragments/AppFragment';

export const query = gql`
  query app($id: ID) {
    App(id: $id) {
      ...AppFragment
      seller {
        name
      }
      age
      description
      type
      previews
      categories {
        title
      }
      rating
      ratingsCount: _reviewsMeta { count }
      # Find one good review
      reviews(
        first: 1
        filter: {
          # Contains space, neat little hack for not null
          description_contains: " ",
        }
      ) {
        id
        title
        description
        createdAt
        rating
        name
      }
    }
  }
  ${AppFragment}
`;

export const appWithProps = graphql(query, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
});