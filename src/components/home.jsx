import { useContext } from "react";
import Hero_Section from "./home/hero_section";
import RecipeGallery from "./home/recipe_galler";
import { Authcontext } from "../context/authProvider";

const Home = () => {
    const { isAuthenticated } = useContext(Authcontext);
    return (
        <main>
            {!isAuthenticated && <Hero_Section /> }
            <RecipeGallery/>
        </main>
    )
}

export default Home