import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type LoginGatedComponentProps = {
    loggedIn: boolean;
    component: JSX.Element
}

const LoginGatedComponent = ({ loggedIn, component }: LoginGatedComponentProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) navigate('/login')
    }, [loggedIn, navigate]) 

     return component;
}

export default LoginGatedComponent;