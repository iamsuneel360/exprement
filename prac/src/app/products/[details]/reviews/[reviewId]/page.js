export default async function ProductReview({ params }) {
  const { details, reviewId } = await params;
  return (
    <div>
      <h1>
        Review {reviewId} for product {details}
      </h1>
    </div>
  );
}
