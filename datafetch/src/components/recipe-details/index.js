export default function RecipeDetailsItem({ getRecipeDetails }) {
  return (
    <div>
      <div className=" p-6 lg:max-w-6xl max-w-2xl mx-auto">
        <div className=" grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
          <div className=" w-full lg:sticky top-0 sm:flex gap-2">
            <img
              src={getRecipeDetails.image}
              alt={getRecipeDetails.name}
              className=" w-4/5 rounded object-cover"
            />
          </div>
          <div>
            <h2>{getRecipeDetails.name}</h2>
          </div>
          <div>
            <p>{getRecipeDetails.mealType[0]}</p>
          </div>
          <div>
            <p>{getRecipeDetails.cuisine}</p>
          </div>
          <div>
            <h1>Incridents</h1>
            <ul>
              {getRecipeDetails.ingredients.map((item) => (
                <li key={item.id}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
