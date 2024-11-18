import axios from "axios";
import { useContext, useState } from "react";
import { Authcontext } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useCrud() {
    
    const [recipeName, setRecipeName] = useState('');
  const [category, setCategory] = useState('');
  const [servings, setServings] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [picture, setPicture] = useState('');

  const { currentUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const [recipess, setRecipes] = useState([]);

    const add_recipe = async () => {
        if(!recipeName || !category || !servings || !preparationTime || !cookingTime || !description || !ingredients || !picture) {
            toast.error('Please fill all the fields');
            return;
        }
        try {
            setIsloading(true);
            const new_recipe = {
                _id : currentUser._id,
                recipeName,
                category,
                servings,
                preparationTime,
                cookingTime,
                description,
                ingredients,
                picture
            };
            const { data, status } = await axios.post('http://localhost:8080/recipes', new_recipe);
            console.log(data)
            if(status === 201) {
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false);
        }
    }

    const get_recipes = async () => {
        setIsloading(true);
        try {
            const { data, status } = await axios.get('http://localhost:8080/recipes');
            if(status === 200) {
                const spec_data = data.filter(recipe => recipe._id === currentUser._id);
                setRecipes(spec_data);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    

    return {
        setRecipeName,
        setCategory,
        setServings,
        setPreparationTime,
        setCookingTime,
        setDescription,
        setIngredients,
        setPicture,
        add_recipe,
        isLoading,
        recipess,
        get_recipes,
        setRecipes
      };
}