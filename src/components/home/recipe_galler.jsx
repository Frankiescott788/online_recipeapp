import { Fragment, useContext, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Image,
  CardFooter,
  Skeleton,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Progress,
  Input,
} from "@nextui-org/react";
import useRecipe from "../../hooks/useSpanucular";
import useCrud from "../../hooks/usecrud";
import { Authcontext } from "../../context/authProvider";
import nothingyet from "../../assets/nothing.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import NotfoundImage from "../../assets/chef-nothing.svg";

export default function RecipeGallery() {
  const { recipes, isLoading, error } = useRecipe();
  const { get_recipes, recipess } = useCrud();
  const { isAuthenticated } = useContext(Authcontext);
  const navigate = useNavigate();

  const [deleteitem, setDelete] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [recipe, setRecipe] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get_recipes();
  }, []);

  const filterSearch = recipess.filter((recipe) => {
    return recipe.recipeName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Fragment>
      <section>
        {isAuthenticated && (
          <div className="flex justify-center">
            <div className="mt-10">
              <div className="flex gap-2 text-2xl">
                <motion.p
                  className="-rotate-[12deg] bg-[#ff00009c] p-1 text-white rounded-md"
                  initial={{
                    opacity: 0,
                    rotate: 0,
                    transition: { duration: "1" },
                  }}
                  animate={{
                    opacity: 1,
                    rotate: -12,
                    transition: { duration: "1" },
                  }}
                >
                  Malicious 🧁
                </motion.p>
                <motion.p
                  initial={{ x: 100 }}
                  animate={{ x: 0, transition: { duration: "1" } }}
                >
                  Recipes
                </motion.p>
              </div>

              <motion.p
                className="text-sm text-default-400 py-5"
                initial={{ y: 50 }}
                animate={{ y: 0, transition: { duration: "1" } }}
              >
                Satisfy Your Cravings, One Dish at a Time.
              </motion.p>
            </div>
          </div>
        )}

        <div className="flex justify-center w-full px-[40px] py-[50pt]">
          <div className="flex w-full flex-col justify-center">
            <Card className="shadow-none">
              {isAuthenticated && (
                <CardBody>
                  {recipess.length === 0 && (
                    <div className="flex justify-center">
                      <div>
                        <div>
                          <Image src={NotfoundImage} className="h-[15rem]" />
                        </div>
                        <p className="text-center text-2xl my-2">
                          No <span className="text-red-500">recipes</span> yet.
                        </p>
                        <div className="flex justify-center ">
                          <Button
                            className="bg-[#ff0000dc] text-white px-[5rem] lg:px-[10rem] my-2"
                            onClick={() => navigate("/addRecipe")}
                          >
                            Add First Recipe
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {recipess.length !== 0 && (
                    <div className="grid grid-cols-12 gap-4">
                      {isLoading ? (
                        <div className="col-span-12">
                          <div className="flex justify-center ">
                            <Progress
                              isIndeterminate
                              color="danger"
                              className="w-[10rem]"
                              content="Loading..."
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="col-span-12">
                            <Input
                              type="search"
                              placeholder="Search..."
                              className="w-[24rem]"
                              onChange={(e) => setSearch(e.target.value)}
                              startContent={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width={24}
                                  height={24}
                                  color={"#9b9b9b"}
                                  fill={"none"}
                                >
                                  <path
                                    d="M17.5 17.5L22 22"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              }
                            />
                            <div className="px-[5rem]">
                              <p className="text-center my-4 text-sm text-default-400">
                                Your Recipes 🧁
                              </p>
                            </div>
                          </div>
                          {filterSearch.map((recipe, i) => (
                            <motion.div
                              className="col-span-12 lg:col-span-3"
                              key={i}
                              initial={{ y: "100" }}
                              animate={{ x: 0 }}
                            >
                              <Card>
                                <img
                                  src={recipe.picture}
                                  alt=""
                                  className="rounded h-[25rem] object-cover"
                                />
                                <CardBody>
                                  <div className="flex gap-1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width={20}
                                      height={20}
                                      color={"#9ca3af"}
                                      fill={"none"}
                                    >
                                      <path
                                        d="M12.0579 22C16.9725 22 21.0638 18.4937 21.9416 13.8586C22.1996 12.4967 21.5931 12.5686 20.3101 12.3438C19.3996 12.1844 18.5498 11.5667 18.2333 10.588C18.0178 9.9216 17.9376 9.89475 17.2352 9.86554C15.7861 9.80529 14.625 8.2689 15.2032 7.02602C15.419 6.56236 15.412 6.50892 15.0078 6.19448C14.3005 5.6443 13.9706 4.6166 14.0978 3.62604C14.2347 2.5591 14.3147 2.1747 13.1854 2.05455C7.45657 1.44501 2 6.0196 2 11.9948C2 17.5205 6.50308 22 12.0579 22Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                      />
                                      <path
                                        d="M11.0078 12L10.9988 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.00781 10L5.99883 10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M12.0078 18L11.9988 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10 6L9 7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M17 14L16 15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7 15L8 16"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="text-gray-400">
                                      {recipe.recipeName}
                                    </p>
                                  </div>
                                  <div className="flex gap-1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width={20}
                                      height={20}
                                      color={"#9ca3af"}
                                      fill={"none"}
                                    >
                                      <path
                                        d="M2 7C2 5.59987 2 4.8998 2.27248 4.36502C2.51217 3.89462 2.89462 3.51217 3.36502 3.27248C3.8998 3 4.59987 3 6 3C7.40013 3 8.1002 3 8.63498 3.27248C9.10538 3.51217 9.48783 3.89462 9.72752 4.36502C10 4.8998 10 5.59987 10 7V17C10 18.4001 10 19.1002 9.72752 19.635C9.48783 20.1054 9.10538 20.4878 8.63498 20.7275C8.1002 21 7.40013 21 6 21C4.59987 21 3.8998 21 3.36502 20.7275C2.89462 20.4878 2.51217 20.1054 2.27248 19.635C2 19.1002 2 18.4001 2 17V7Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6 17H6.00898"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M2 7H10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M11.4486 8.26843C11.0937 6.93838 10.9163 6.27336 11.0385 5.69599C11.146 5.18812 11.4108 4.72747 11.7951 4.38005C12.2319 3.98508 12.8942 3.80689 14.2187 3.4505C15.5432 3.09412 16.2055 2.91593 16.7804 3.03865C17.2862 3.1466 17.7449 3.41256 18.0909 3.79841C18.4842 4.23706 18.6617 4.90209 19.0166 6.23213L21.5514 15.7316C21.9063 17.0616 22.0837 17.7266 21.9615 18.304C21.854 18.8119 21.5892 19.2725 21.2049 19.62C20.7681 20.0149 20.1058 20.1931 18.7813 20.5495C17.4568 20.9059 16.7945 21.0841 16.2196 20.9614C15.7138 20.8534 15.2551 20.5874 14.9091 20.2016C14.5158 19.7629 14.3383 19.0979 13.9834 17.7679L11.4486 8.26843Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M17.7812 16.6953L17.7899 16.693"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M12 8.00019L18.5001 6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="text-gray-400">
                                      {recipe.category}
                                    </p>
                                  </div>
                                  <div className="flex justify-center">
                                    <Button
                                      className="px-[10rem] text-white bg-[#FF0000]"
                                      onClick={() => {
                                        onOpen();
                                        setRecipe(recipe);
                                      }}
                                    >
                                      View Recipe
                                    </Button>
                                  </div>
                                </CardBody>
                              </Card>
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </CardBody>
              )}
              {!isAuthenticated && (
                <CardBody>
                  <p>Please login to see your recipes</p>
                </CardBody>
              )}
            </Card>
          </div>
        </div>
        <div>
          <p className="text-sm text-default-400 px-4 text-center py-2">Privacy Policy: Your data is safe with us. We only use it to improve your experience. No sharing, ever.</p>
        </div>
      </section>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {recipe?.recipeName}
              </ModalHeader>
              <ModalBody>
                <div>
                  <Image src={recipe?.picture} />
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    color={"#9ca3af"}
                    fill={"none"}
                  >
                    <path
                      d="M12.0579 22C16.9725 22 21.0638 18.4937 21.9416 13.8586C22.1996 12.4967 21.5931 12.5686 20.3101 12.3438C19.3996 12.1844 18.5498 11.5667 18.2333 10.588C18.0178 9.9216 17.9376 9.89475 17.2352 9.86554C15.7861 9.80529 14.625 8.2689 15.2032 7.02602C15.419 6.56236 15.412 6.50892 15.0078 6.19448C14.3005 5.6443 13.9706 4.6166 14.0978 3.62604C14.2347 2.5591 14.3147 2.1747 13.1854 2.05455C7.45657 1.44501 2 6.0196 2 11.9948C2 17.5205 6.50308 22 12.0579 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.0078 12L10.9988 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.00781 10L5.99883 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0078 18L11.9988 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 6L9 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 14L16 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 15L8 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-400">{recipe.recipeName}</p>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    color={"#9ca3af"}
                    fill={"none"}
                  >
                    <path
                      d="M2 7C2 5.59987 2 4.8998 2.27248 4.36502C2.51217 3.89462 2.89462 3.51217 3.36502 3.27248C3.8998 3 4.59987 3 6 3C7.40013 3 8.1002 3 8.63498 3.27248C9.10538 3.51217 9.48783 3.89462 9.72752 4.36502C10 4.8998 10 5.59987 10 7V17C10 18.4001 10 19.1002 9.72752 19.635C9.48783 20.1054 9.10538 20.4878 8.63498 20.7275C8.1002 21 7.40013 21 6 21C4.59987 21 3.8998 21 3.36502 20.7275C2.89462 20.4878 2.51217 20.1054 2.27248 19.635C2 19.1002 2 18.4001 2 17V7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 17H6.00898"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 7H10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.4486 8.26843C11.0937 6.93838 10.9163 6.27336 11.0385 5.69599C11.146 5.18812 11.4108 4.72747 11.7951 4.38005C12.2319 3.98508 12.8942 3.80689 14.2187 3.4505C15.5432 3.09412 16.2055 2.91593 16.7804 3.03865C17.2862 3.1466 17.7449 3.41256 18.0909 3.79841C18.4842 4.23706 18.6617 4.90209 19.0166 6.23213L21.5514 15.7316C21.9063 17.0616 22.0837 17.7266 21.9615 18.304C21.854 18.8119 21.5892 19.2725 21.2049 19.62C20.7681 20.0149 20.1058 20.1931 18.7813 20.5495C17.4568 20.9059 16.7945 21.0841 16.2196 20.9614C15.7138 20.8534 15.2551 20.5874 14.9091 20.2016C14.5158 19.7629 14.3383 19.0979 13.9834 17.7679L11.4486 8.26843Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.7812 16.6953L17.7899 16.693"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8.00019L18.5001 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-400">{recipe.category}</p>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    color={"#9ca3af"}
                    fill={"none"}
                  >
                    <path
                      d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-400">{recipe.servings} people</p>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    color={"#9ca3af"}
                    fill={"none"}
                  >
                    <path
                      d="M8.37574 3C8.16183 3.07993 7.95146 3.16712 7.74492 3.26126M20.7177 16.3011C20.8199 16.0799 20.9141 15.8542 21 15.6245M18.4988 19.3647C18.6705 19.2044 18.8365 19.0381 18.9963 18.866M15.2689 21.3723C15.463 21.2991 15.6541 21.22 15.8421 21.1351M12.156 21.9939C11.9251 22.0019 11.6926 22.0019 11.4616 21.9939M7.78731 21.1404C7.96811 21.2217 8.15183 21.2978 8.33825 21.3683M4.67255 18.9208C4.80924 19.0657 4.95029 19.2064 5.0955 19.3428M2.6327 15.6645C2.70758 15.8622 2.78867 16.0569 2.87572 16.2483M2.00497 12.5053C1.99848 12.2972 1.9985 12.0878 2.00497 11.8794M2.62545 8.73714C2.69901 8.54165 2.77864 8.34913 2.8641 8.1598M4.65602 5.47923C4.80068 5.32514 4.95025 5.17573 5.1045 5.03124"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M13.5 12H16M12 10.5V6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M22 12C22 6.47715 17.5228 2 12 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-gray-400">{recipe?.preparationTime}</p>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    color={"#9ca3af"}
                    fill={"none"}
                  >
                    <circle
                      cx="12"
                      cy="13"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 19L3 21M19 19L21 21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 9.5V13.5L14 15.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3.5V2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 2H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-400">
                    {recipe?.cookingTime} of cooking time
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Instructions:</p>
                  <p className="text-gray-400 text-sm">{recipe?.description}</p>
                </div>
                <div>
                  <p className="text-gray-400">Ingredients:</p>
                  <p className="text-gray-400 text-sm">{recipe?.ingredients}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={async () => {
                    await axios.delete(
                      "http://localhost:8080/recipes/" + recipe?.id
                    );
                    onClose();
                    setDelete(true);
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"red"}
                    fill={"none"}
                  >
                    <path
                      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 16.5L9.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 16.5L14.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    onClose();
                    navigate("/recipe/put/" + recipe?.id);
                  }}
                >
                  update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div
        className={`fixed right-0 bottom-0 left-0 top-0 backdrop-blur-md  justify-center z-30 pt-[20rem] ${
          deleteitem ? "flex" : "hidden"
        }`}
      >
        <div className="">
          <Spinner className="ms-5" />
          <div>Deleting...</div>
        </div>
      </div>
    </Fragment>
  );
}
