import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 100px);
    color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    width: 400px;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.bgLighter};
    gap: 10px;
    padding: 20px 50px;
    @media (max-width: 700px) {
        width: 100%;
        padding: 20px;
    }
`;

const Title = styled.h1`
    font-size: 24px;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 300;
`;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    outline: none;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    cursor: pointer;
    &:active {
        background-color: ${({ theme }) => theme.softClick};
    }
`;

const GoogleButton = styled.button`
    height: 75px;
    width: 400px;
    font-size: 1.25rem;
    cursor: pointer;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.textSoft};
    padding: 20px 50px;
    @media (max-width: 700px) {
        width: 100%;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

const useAppDispatch: () => AppDispatch = useDispatch;

const Signin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const timeoutMessage = setTimeout(() => {
            setError("");
        }, 3000);
        return () => clearTimeout(timeoutMessage);
    }, [error]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER}/api/auth/signin`,
                {
                    name,
                    password,
                }
            );
            console.log(res.data);
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err: any) {
            dispatch(loginFailure());
            setError(err.response.data.message);
            console.log(err);
        }
    };

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER}/api/auth/signup`,
                {
                    name,
                    password,
                    email,
                }
            );
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err: any) {
            dispatch(loginFailure());
            setError(err.response.data.message);
            console.log(err);
        }
    };

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                axios
                    .post(`${import.meta.env.VITE_SERVER}/api/auth/google`, {
                        name: result.user.displayName,
                        email: result.user.email,
                        img: result.user.photoURL,
                    })
                    .then((res) => {
                        dispatch(loginSuccess(res.data));
                        navigate("/");
                        console.log(res.data);
                    });
            })
            .catch((error) => {
                console.log(error);
                dispatch(loginFailure());
            });
    };
    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to YouClone</SubTitle>
                {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
                <Input
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Input
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleSignUp}>Sign up</Button>
            </Wrapper>
            <GoogleButton onClick={signInWithGoogle}>
                Log in with Google
            </GoogleButton>
        </Container>
    );
};

export default Signin;
