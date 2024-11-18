import axios from "axios"
import { useEffect, useState } from "react";

export default function useRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);

    const getRecipes = async () => {
        try {
            const res = await axios.get('https://api.edamam.com/search?q=recipe&app_id=6d5ddb96&app_key=687ec90b5c82c75929fffae21b21e1db');
            const data = await res.data;
            if(res.status === 200) {
                setRecipes(data.hits);
                setIsloading(false);
                console.log(hits)
            }
            console.log(data);
        } catch (error) {
            setError('Please check your internet connection')
        }
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return {
        recipes,
        isLoading,
        error
    };


}