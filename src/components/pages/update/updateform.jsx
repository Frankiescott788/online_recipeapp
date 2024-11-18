import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Authcontext } from "../../../context/authProvider";

export default function Updateform() {

    const [recipeName, setRecipeName] = useState('');
    const [category, setCategory] = useState('');
    const [servings, setServings] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [picture, setPicture] = useState(null);

    const { currentUser } = useContext(Authcontext);

    const pictureRef = useRef(null);

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);  
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, status } = await axios.get('http://localhost:8080/recipes/' + id);
                if(status === 404) {
                    console.log(data);
                }
                if(status === 200) {
                    setRecipeName(data.recipeName);
                    setCategory(data.category);
                    setServings(data.servings);
                    setPreparationTime(data.preparationTime);
                    setCookingTime(data.cookingTime);
                    setDescription(data.description);
                    setIngredients(data.ingredients);
                    setPicture(data.picture);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    const handlePictureChange = (event) => {
        setPicture(event.target.files[0]);
    };

    const update = async () => {
        try {
            setIsLoading(true);
            const updatedRecipe = {
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
            const { data, status } = await axios.put('http://localhost:8080/recipes/' + id, updatedRecipe);
            if (status === 200) {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="px-2 lg:px-[5rem] pt-[1rem]">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <button className="flex gap-2" onClick={() => {
                        navigate('/')
                    }}>
                        <div className="mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} color={"#000000"} fill={"none"}>
                                <path d="M3.99982 11.9998L19.9998 11.9998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p>
                            Back
                        </p>
                    </button>
                </div>
                <Card className="col-span-12 lg:col-span-6 p-4 mb-6">
                    <Input
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        placeholder="Recipe name here..."
                        label={recipeName}
                    />

                    <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category here..."
                        label={category}
                        className="my-3"
                    />

                    <Input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        placeholder="Enter servings here..."
                        label={servings}
                    />

                    <Input
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                        placeholder="Enter preparation time here..."
                        label={preparationTime}
                        className="my-3"
                    />

                    <Input
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        placeholder="Enter cooking time here..."
                        label={cookingTime}
                    />

                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description here..."
                        label={description}
                    />

                    <Input
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Enter ingredients here..."
                        label={ingredients}
                    />

                    <Input
                        type="file"
                        ref={pictureRef}
                        onChange={handlePictureChange}
                        placeholder="Upload picture here..."
                        label="Picture"
                    />

                    <div className="flex justify-center pt-5">
                        <Button className="bg-[#FF0000] text-white px-[10rem] " onClick={() => {
                            update();
                            navigate('/');
                        }} isDisabled={isLoading}>{isLoading ? 'Updating...' : 'Submit'}</Button>
                    </div>
                </Card>
            </div>
        </section>
    )
}