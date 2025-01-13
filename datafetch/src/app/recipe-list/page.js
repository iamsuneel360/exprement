import RecipeList from "@/components/recipe-list";

async function fetchListOfRecipe() {
  try {
    const apiResponse = await fetch("https://dummyjson.com/recipes");
    const data = await apiResponse.json();
    return data?.recipes;
  } catch (error) {
    throw new Error(error);
  }
}

export default async function Recipe() {
  const recipeList = await fetchListOfRecipe();

  return (
    <div>
      <RecipeList recipeList={recipeList} />
    </div>
  );
}
