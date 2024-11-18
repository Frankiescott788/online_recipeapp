import axios from "axios";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { v4 } from "uuid";
import { Authcontext } from "../context/authProvider";
import { useNavigate } from "react-router-dom";

export default function useAuth () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsloading] = useState(false);

    const [cookies, setCookies, removeCookie] = useCookies(['auth_token']);
    const { setIsAuthenticated } = useContext(Authcontext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username : '',
        email : '',
        password : ''
    });

    const sign_up = async () => {
        setIsloading(true);
        if(!username || !email || !password) {
            setErrors({
                ...errors,
                username : !username ? 'Username is required' : '',
                email : !email ? 'Email is required' : '',
                password : !password ? 'Password is required' : ''
            })
            return;
        }
        try {
            const new_user = {
                    _id : v4(),
                    username,
                    email,
                    password
            }
           const find_email = await axios.get(`http://localhost:8080/users?email=${email}`);
           if(find_email.data.length > 0) {
               const user = find_email.data.find(user => user.email === email);
               if(user) {
                   setErrors({
                       ...errors,
                       email : 'Email already exists in our system'
                   })
                   return;
               }
           }
           const { data, status } = await axios.post('http://localhost:8080/users', new_user);
               if(status === 201) {
                   setErrors({
                       username : '',
                       email : '',
                       password : ''
                   })
                   setCookies('auth_token', data._id, {
                       path : "/",
                       maxAge : 3600,
                       secure : true
                   });
                   setIsAuthenticated(true);
                   navigate('/');
               }
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false);
        }
    }

    const sign_in = async () => {
        if(!email || !password) {
            setErrors({
                ...errors,
                email : !email ? 'Email is required' : '',
                password : !password ? 'Password is required' : ''
            })
            return;
        }
        try {
            setIsloading(true);
            const { data, status } = await axios.get(`http://localhost:8080/users`);

            if(status === 200) {
                const user = data.find(user => user.email === email);
                if(user) {
                    console.log(user);
                    setErrors({
                        email : '',
                        password : ''
                    })

                    if(user.password === password) {
                        setCookies('auth_token', user._id, {
                            path : "/",
                            maxAge : 3600,
                            secure : true
                        });
                        setIsAuthenticated(true);
                        navigate('/');
                    } else {
                        setErrors({
                            ...errors,
                            email : '',
                            password : 'Wrong password'
                        })
                    }
                } else {
                    setErrors({
                        ...errors,
                        email : 'Email does not exist in our system',
                        password : ''
                    })
                }
            } 

        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false);
        }
    }

    const logout = () => {
        removeCookie('auth_token');
        setIsAuthenticated(false);
        navigate('/signin');
    }

    return {
        sign_up,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        sign_in,
        errors,
        logout
    }
}