import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Hero_Section = () => {
  const navigate = useNavigate();
  return (
    <section className="">
      <div className="hero-section flex justify-center mx-3 rounded-md">
        <div className="w-[70dvw] text-center place-content-center">
          <p className="text-4xl px-4 text-white">
            Create, Share, and Discover Delicious Recipes
          </p>
          <p className="text-white">
            From kitchen to table, create and share your culinary creations.
          </p>
          <div className="flex justify-center">
            <Button className="bg-[#FF0000] px-[50pt] my-4 text-white rounded" onClick={() => navigate("/signin")}>
              Get Started{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#ffffff"}
                fill={"none"}
              >
                <path
                  d="M14 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5859 13.6026L17.6194 14.3639C16.0536 15.5974 15.2707 16.2141 14.6354 15.9328C14 15.6515 14 14.6881 14 12.7613L14 11.2387C14 9.31191 14 8.34853 14.6354 8.06721C15.2707 7.7859 16.0536 8.40264 17.6194 9.63612L18.5858 10.3974C19.5286 11.1401 20 11.5115 20 12C20 12.4885 19.5286 12.8599 18.5859 13.6026Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero_Section;
