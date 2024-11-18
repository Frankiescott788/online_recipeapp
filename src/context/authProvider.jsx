import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const Authcontext = createContext();
export default function Authprovider({ children }) {

    const [cookies] = useCookies(['auth_token']);
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
              if(cookies.auth_token !== undefined) {
                const { data } = await axios.get(`http://localhost:8080/users/`);
                const find_user = data.find(user => user._id === cookies.auth_token);
                if(find_user.length !== 0) {
                    setCurrentUser(find_user);
                    setIsAuthenticated(true);
                }
              }  else {
                console.log('cookie does not exist')
              }
            } catch (error) {
                console.log(error)
            } finally {
                setIsloading(false);
            }
        }
        checkAuth()
    });

    return (
        <Authcontext.Provider value={{
            currentUser,
            isAuthenticated,
            isLoading,
            setIsAuthenticated
        }}>
            {children}
        </Authcontext.Provider>
    )
}