import { ThemeProvider, styled } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { menuFalse } from "./redux/menuSlice";
import Search from "./pages/Search";
import IconsMenu from "./components/IconsMenu";

type Props = {
    type: boolean;
    menu: boolean | undefined;
};

const MainContainer = styled.div``;
const Container = styled.div`
    display: flex;
`;

const MobileWrapper = styled.div`
    @media (min-width: 1050px) {
        display: none;
    }
`;

const ContainerBackground = styled.div<Props>`
    height: calc(100vh - 56px);
    background-color: rgb(0, 0, 0, 0.4);
    position: ${(props) => props.menu && "absolute"};
    right: 0;
    width: ${(props) => props.menu && "calc(100vw - 240px)"};
    display: ${(props) => (props.type && props.menu ? "block" : "none")};
`;

const Main = styled.div<Props>`
    background-color: ${({ theme }) => theme.bg};
    flex: ${(props) => (props.menu ? "5" : "17")};
    height: calc(100vh - 56px);
    overflow: scroll;
    @media (max-width: 1050px) {
        height: calc(100vh - 118px);
    }
`;

const Wrapper = styled.div`
    padding: 22px 46px;
    @media (max-width: 1050px) {
        padding: 20px 10px;
    }
`;

const useAppDispatch: () => AppDispatch = useDispatch;

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const dispatch = useAppDispatch();

    const menu = useSelector((state: RootState) => state.menu.menu);
    const type = useSelector((state: RootState) => state.menu.isVideoPage);

    const handleCloseMenu = () => {
        dispatch(menuFalse());
    };

    return (
        <>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <MainContainer>
                    <BrowserRouter>
                        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                        <Container>
                            <Menu
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                            />

                            <ContainerBackground
                                type={type}
                                menu={menu}
                                onClick={handleCloseMenu}
                            />
                            <Main type={type} menu={menu}>
                                <Wrapper>
                                    <Routes>
                                        <Route path="/">
                                            <Route
                                                index
                                                element={<Home type="random" />}
                                            />
                                            <Route
                                                path="trends"
                                                element={<Home type="trend" />}
                                            />
                                            <Route
                                                path="subscriptions"
                                                element={<Home type="sub" />}
                                            />
                                            <Route
                                                path="search"
                                                element={<Search />}
                                            />
                                            <Route
                                                path="signin"
                                                element={<Signin />}
                                            />
                                            <Route path="video">
                                                <Route
                                                    path=":id"
                                                    element={<Video />}
                                                />
                                            </Route>
                                        </Route>
                                    </Routes>
                                </Wrapper>
                            </Main>
                        </Container>
                        <MobileWrapper>
                            <IconsMenu />
                        </MobileWrapper>
                    </BrowserRouter>
                </MainContainer>
            </ThemeProvider>
        </>
    );
}

export default App;
