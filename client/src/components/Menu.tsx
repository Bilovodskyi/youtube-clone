import { useEffect } from "react";
import { styled } from "styled-components";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdQueueMusic } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { MdOutlineMovie } from "react-icons/md";
import { MdOutlineNewspaper } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineLiveTv } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { isVideoPageFalse, menuTrue } from "../redux/menuSlice";
import { PiUserCircleLight } from "react-icons/pi";
import { BsFire } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { RiVideoLine } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import IconsMenu from "./IconsMenu";

type Props = {
    type: boolean;
    isVideoPage: boolean;
};

type DisabledProps = {
    disabled: boolean;
};

const Container = styled.div<Props>`
    background-color: ${({ theme }) => theme.bg};
    height: calc(100vh - 56px);
    flex: 1;
    color: ${({ theme }) => theme.textSoft};
    font-size: 14px;
    overflow: scroll;
    position: ${(props) => (props.isVideoPage ? "absolute" : "sticky")};
    width: ${(props) => props.isVideoPage && "240px"};
    top: ${(props) => (props.isVideoPage ? "56px" : "0")};
    display: ${(props) => !props.type && props.isVideoPage && "none"};
    @media (max-width: 1050px) {
        display: none;
    }
`;

const Wrapper = styled.div`
    padding: 14px;
`;

const Item = styled.div<DisabledProps>`
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    color: ${(props) => !props.disabled && (({ theme }) => theme.text)};
    &:hover {
        background-color: ${({ theme }) => theme.softClick};
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.softClick};
`;
const Login = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Button = styled.button`
    padding: 5px 12px;
    background-color: transparent;
    border: 0.5px solid ${({ theme }) => theme.border};
    color: #3ea6ff;
    border-radius: 24px;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;
const Title = styled.h1`
    font-size: 1rem;
    padding: 5px 0 5px 10px;
    font-weight: 300;
`;

const useAppDispatch: () => AppDispatch = useDispatch;

const Menu = ({ darkMode, setDarkMode }: MenuType) => {
    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );
    const dispatch = useAppDispatch();

    const menu = useSelector((state: RootState) => state.menu.menu);
    const isVideoPage = useSelector(
        (state: RootState) => state.menu.isVideoPage
    );

    const handleDefaultMenuState = () => {
        dispatch(menuTrue());
        dispatch(isVideoPageFalse());
    };

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            handleDefaultMenuState();
        }
    }, [location.pathname]);

    return (
        <Container type={menu} isVideoPage={isVideoPage}>
            {menu ? (
                <Wrapper>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleDefaultMenuState}>
                        <Item disabled={false}>
                            <MdOutlineHome size="20px" />
                            Home
                        </Item>
                    </Link>
                    <Link
                        to="trends"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleDefaultMenuState}>
                        <Item disabled={false}>
                            <MdOutlineExplore size="20px" />
                            Explore
                        </Item>
                    </Link>
                    <Link
                        to="subscriptions"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleDefaultMenuState}>
                        <Item disabled={false}>
                            <MdOutlineSubscriptions size="20px" />
                            Subscriptions
                        </Item>
                    </Link>

                    <Hr />
                    <Item disabled={true}>
                        <MdOutlineLibraryAddCheck size="20px" />
                        Library
                    </Item>
                    <Item disabled={true}>
                        <MdHistory size="20px" />
                        History
                    </Item>
                    {currentUser && (
                        <>
                            <Item disabled={true}>
                                <RiVideoLine size="20px" />
                                Your Videos
                            </Item>
                            <Item disabled={true}>
                                <AiOutlineClockCircle size="20px" />
                                Watch later
                            </Item>
                        </>
                    )}

                    <Hr />
                    {!currentUser && (
                        <>
                            <Login>
                                Sign in to like videos, comment and subscribe
                                <Link
                                    to="signin"
                                    style={{ textDecoration: "none" }}>
                                    <Button>
                                        <PiUserCircleLight
                                            style={{
                                                fontSize: "1.6rem",
                                            }}
                                        />
                                        Sign in
                                    </Button>
                                </Link>
                            </Login>
                            <Hr />
                        </>
                    )}
                    <Title>Explore</Title>
                    <Item disabled={true}>
                        <BsFire size="20px" />
                        Trending
                    </Item>
                    <Item disabled={true}>
                        <MdQueueMusic size="20px" />
                        Music
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineMovie size="20px" />
                        Movies & TV
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineLiveTv size="20px" />
                        Live
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineVideogameAsset size="20px" />
                        Gaming
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineNewspaper size="20px" />
                        News
                    </Item>
                    <Item disabled={true}>
                        <MdSportsSoccer size="20px" />
                        Sports
                    </Item>
                    <Item disabled={true}>
                        <BsLightbulb size="20px" />
                        Learning
                    </Item>
                    <Item disabled={true}>
                        <GiClothes size="20px" />
                        Fashion & Beauty
                    </Item>
                    <Hr />
                    <Item disabled={true}>
                        <MdOutlineSettings size="20px" />
                        Settings
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineReportProblem size="20px" />
                        Report
                    </Item>
                    <Item disabled={true}>
                        <MdHelpOutline size="20px" />
                        Help
                    </Item>
                    <Item
                        disabled={false}
                        onClick={() => setDarkMode(!darkMode)}>
                        <MdOutlineLightMode size="20px" />
                        {darkMode ? "Light" : "Dark"} Mode
                    </Item>
                </Wrapper>
            ) : (
                <IconsMenu />
            )}
        </Container>
    );
};

export default Menu;
