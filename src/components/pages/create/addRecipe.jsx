import { Button, Card, Image, Input, Textarea, TimeInput } from "@nextui-org/react"
import useCrud from "../../../hooks/usecrud"
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Addrecipes = () => {

  const navigate = useNavigate();

    const { setCategory, setCookingTime, setRecipeName, setDescription, setIngredients, setPreparationTime, setServings, setPicture, add_recipe, isLoading } = useCrud();
    return (
        <section className="px-2 lg:px-[5rem] pt-[1rem]">
          <Toaster position="top-right"/>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <button className="flex gap-2" onClick={() => navigate('/')}>
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
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="Recipe name here..."
        label="Recipe name"
      />

      <Input
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category here..."
        label="Category"
        className="my-3"
      />

     <Input type="number"
      placeholder="Enter servings here..."
      label="Servings"
     onChange={e => {
      setServings(e.target.value);
     }}/>

      <Input
        onChange={(e) => setPreparationTime(e.target.value)}
        placeholder="Enter preparation time here..."
        label="Preparation time"
        className="my-3"
      />

      <Input
        onChange={(e) => setCookingTime(e.target.value)}
        placeholder="Enter cooking time here..."
        label="Cooking time"
      />
      <Input type="file" className="pt-3" onChange={(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const fullUrl = reader.result;
            setPicture(fullUrl);
          };
      
          if (file) {
            reader.readAsDataURL(file);
          }
      }}/>
      <p className="text-tiny text-gray-400 pt-1 ps-1">Please choose an image of your recipe</p>

      <Textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Instructions here..."
        label="Instructions"
        className="my-3"
      />

      <Textarea
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients here..."
        label="Ingredients"
      />
                    <div className="text-center py-4">
                       {!isLoading && <Button className="px-[8rem] lg:px-[13rem] bg-[#FF0000] text-white" onClick={() => add_recipe()}>Submit</Button> }
                       {isLoading && <Button className="px-[8rem] lg:px-[13rem] bg-[#FF0000] text-white" onClick={() => add_recipe()}>Loading...</Button> }
                    </div>
                </Card>
                <div className="col-span-6 hidden lg:block">
                    <div className="mt-[10rem] text-center">
                        <p className="text-4xl">Add Recipe</p>
                        <p className="text-xl text-gray-400">Complete the form to submit your dish.</p>
                        <Image src="https://img.freepik.com/free-vector/3d-pan-with-frying-egg-cooking-breakfast-vector_107791-30720.jpg?t=st=1728461144~exp=1728464744~hmac=e36eb9db41673ed66c22c765889bb941df4f568a35606d93bb87d10cdda4619a&w=1380" />
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Addrecipes