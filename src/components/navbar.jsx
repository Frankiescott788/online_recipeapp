import {
  Button,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/authProvider";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useContext(Authcontext);
  const { logout } = useAuth();
  return (
    <>
      <nav className="px-5 py-2">
        <div className="flex justify-between">
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              className="logo-img mt-[24px] lg:mt-2 h-[2rem]"
            />
          </div>
          <div className="flex gap-6 mt-4">
            {isAuthenticated && (
              <Button
                className="bg-[#FF0000] text-white mt-2"
                size="sm"
                onClick={() => navigate("/addRecipe")}
              >
                New Recipe
              </Button>
            )}
            <div>
              {!isAuthenticated && (
                <Button
                  className="bg-[#FF0000] text-white px-[40pt] shadow-[#FF0000] rounded-full"
                  onClick={() => navigate("/signup")}
                >
                  Login
                </Button>
              )}
              {isAuthenticated && (
                <>
                  <Dropdown>
                    <DropdownTrigger>
                      <User
                        className="hidden lg:flex"
                        name={currentUser?.username}
                        avatarProps={{
                          src : "https://img.freepik.com/premium-vector/set-3d-portraits-happy-people_1309810-22.jpg?semt=ais_hybrid"
                        }}
                        description={currentUser?.email}
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="logout" onClick={logout}>
                        <div className="flex gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={20}
                            height={20}
                            color={"#9b9b9b"}
                            fill={"none"}
                          >
                            <path
                              d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-default-400">Logout</span>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
