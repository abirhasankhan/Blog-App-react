import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
		//TODO make it more easy

		// method 1
		// if(authStatus === true) {

		//     navigate('/');

		// } else if(authStatus === false) {

		//     navigate('/login');
		// }

		// method 2
		// if (authStatus !== authentication) {
		// 	navigate(authentication ? "/login" : "/");
		// }

		// method 3
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}

		setLoader(false);

	},[authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

