import { useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from './ErrorMessage';
import gql from 'graphql-tag';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION (
  $name: String!
  $description: String!
  $price: Int!
  $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;


export function CreateProduct(props) {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: "0",
    price: 0,
    description: "",
  });

  const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs
  })

  return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      console.log(inputs);
      await createProduct();
      clearForm();
    }}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
      <label htmlFor="image">
        Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.name}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={inputs.price}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs.description}
          ></textarea>
        </label>

        <button type="submit">+ Add Button</button>
      </fieldset>
    </Form>
  );
}
