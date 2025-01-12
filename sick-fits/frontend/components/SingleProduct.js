import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
    }
  }
`;

function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <div>
      <div className="details">
        <h2>{Product.name}</h2>
      </div>
    </div>
  );
}

export default SingleProduct;
