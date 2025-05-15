import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {  getRecipeFromMistral } from "../../ai"
import Loading from "./Loading"

export default function MainComponent() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    async function getRecipe() {
        setLoading(true)
        setError("")
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients);
            if(recipeMarkdown) {
                setRecipe(recipeMarkdown);
            }else{
                setError("Sorry, there was an error getting the recipe. Please refresh the page and try again.")
            }
        } catch (error) {
            setError("Sorry, there was an error getting the recipe. Please refresh the page and try again.")
        } finally {
            setLoading(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if(!newIngredient) return;
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length === 0 && <p className="initial-guidance">Enter atleast 4 ingredients one by one!</p> }
            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {loading && <Loading />}
            {error && <p className="error">{error}</p>}
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}