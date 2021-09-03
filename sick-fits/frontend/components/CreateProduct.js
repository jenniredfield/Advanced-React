import useForm from '../lib/useForm';

export function CreateProduct(props) {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'nice shos',
    price: 12312,
    description: 'Best shoes',
  });

  return (
    <form>
      <label htmlFor="name">
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
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={inputs.price}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Clear form
      </button>
    </form>
  );
}
