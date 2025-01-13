export default async function ProductDetails({ params }) {
  // const details = (await params).details;
  const { details } = await params;
  return (
    <div>
      <h1>Product Details of {details}</h1>
    </div>
  );
}
