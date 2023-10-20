import { styled } from "styled-components";
import { MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { BiVideoPlus } from "react-icons/bi";
import { SiYoutube } from "react-icons/si";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidMicrophone } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import { PiUserCircleLight } from "react-icons/pi";

import { isVideoPageFalse, menuToggle, menuTrue } from "../redux/menuSlice";
import { useState } from "react";
import UploadVideo from "./UploadVideo";
import { IoMdNotificationsOutline } from "react-icons/io";
import LogoutMenu from "./LogoutMenu";
import { MdArrowBack } from "react-icons/md";
import { COLORS, avatarColor } from "../utils/AvatarColor";

type Props = {
    color?: string;
};

type Mobile = {
    isMobile: boolean;
};

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bg};
    height: 56px;
    z-index: 2;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0px 20px;
    position: relative;
`;

const SearchContainer = styled.div`
    display: flex;
    height: 40px;
    width: 45%;
    @media (max-width: 768px) {
        display: none;
    }
`;

const SearchContainerMobile = styled.div`
    display: flex;
    height: 40px;
`;

const SearchMobile = styled.div`
    color: ${({ theme }) => theme.textDarker};
    display: flex;
    align-items: center;
    cursor: pointer;
    @media (min-width: 768px) {
        display: none;
    }
`;

const Search = styled.div<Mobile>`
    display: flex;
    width: calc(100% - 125px);
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    border: 0.5px solid ${({ theme }) => theme.border};
    border-radius: 50px 0px 0px 50px;
    color: ${({ theme }) => theme.text};
    background-color: ${(props) =>
        props.isMobile && (({ theme }) => theme.button)};
`;

const SearchButton = styled.button`
    border-radius: 0px 50px 50px 0px;
    width: 70px;
    border: 0.5px solid ${({ theme }) => theme.border};
    border-left: none;
    display: flex
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    color: ${({ theme }) => theme.textDarker};
    background-color: ${({ theme }) => theme.button};
    &:hover {
        background-color: ${({ theme }) => theme.softClick};
    }
`;

const CloseButton = styled.div`
    font-size: 1.4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 1rem;
    color: ${({ theme }) => theme.textDarker};
    border: none;
    &:focus {
        outline: none;
    }
    background-color: transparent;
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

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    font-weight: 500;
    cursor: pointer;
    padding-right: 25px;
    color: ${({ theme }) => theme.text};
    @media (max-width: 768px) {
        padding-right: 0px;
    }
`;

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #999;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: semi-bold;
    font-size: 16px;
    color: ${({ theme }) => theme.text};
`;

const HumburgerButton = styled.button`
    width: 36px;
    height: 36px;
    margin-right: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    border: none;
    color: inherit;
    background-color: transparent;
    border-radius: 100%;
    &:hover {
        background-color: ${({ theme }) => theme.soft};
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const LogoContainer = styled.div`
    position: relative;
`;

const LogoBackground = styled.div`
width: 20px,
height: 20px,
position: absolute,
backgroundColor: white,
left: 0,
right: 0,
margin: auto,
top: 0,
bottom: 0,
zIndex: -1,
`;

const NoImgURL = styled.div<Props>`
    width: 36px;
    height: 36px;
    display: flex;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
`;

const MobileSearchWrapper = styled.div`
    display: flex;
    align-titems: center;
    gap: 20px;
`;

const SearchGoBack = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 1.25rem;
`;

const useAppDispatch: () => AppDispatch = useDispatch;

const Navbar = ({ darkMode, setDarkMode }: MenuType) => {
    const [open, setOpen] = useState(false);
    const [logoutMenu, setLogoutMenu] = useState(false);
    const [mobileSearch, setMobileSearch] = useState(false);
    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );
    //or using destructuring
    // const {currentUser} = useSelector((state: RootState) => state.user)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const handleOpenMenu = () => {
        dispatch(menuToggle());
    };

    const handleDefaultMenuState = () => {
        dispatch(menuTrue());
        dispatch(isVideoPageFalse());
    };

    const clearSearch = () => {
        setSearch("");
    };

    const handleSearch = () => {
        navigate(`/search?q=${search}`);
        setSearch("");
    };

    return (
        <>
            {mobileSearch ? (
                <Container>
                    <Wrapper>
                        <SearchGoBack>
                            <MdArrowBack
                                onClick={() => setMobileSearch(false)}
                            />
                        </SearchGoBack>
                        <SearchContainerMobile>
                            <Search
                                isMobile={true}
                                style={{ borderRadius: "50px", width: "100%" }}>
                                <Input
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                                {search.length > 0 && (
                                    <CloseButton
                                        onClick={clearSearch}
                                        style={{
                                            fontSize: "1rem",
                                            marginRight: "20px",
                                        }}>
                                        <TfiClose />
                                    </CloseButton>
                                )}
                                <MdSearch
                                    onClick={() =>
                                        navigate(`/search?q=${search}`)
                                    }
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                />
                            </Search>

                            {search.length === 0 && (
                                <SearchButton
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        padding: "0px",
                                        marginLeft: "15px",
                                        border: "none",
                                        flexShrink: "0",
                                    }}>
                                    <BiSolidMicrophone
                                        style={{
                                            fontSize: "1.25rem",
                                        }}
                                    />
                                </SearchButton>
                            )}
                        </SearchContainerMobile>
                    </Wrapper>
                </Container>
            ) : (
                <Container>
                    <Wrapper>
                        <Logo>
                            <HumburgerButton>
                                <RxHamburgerMenu
                                    size="20px"
                                    onClick={handleOpenMenu}
                                />
                            </HumburgerButton>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                                onClick={handleDefaultMenuState}>
                                <LogoContainer>
                                    <SiYoutube
                                        style={{ color: "red" }}
                                        size="40px"
                                    />
                                    <LogoBackground
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            position: "absolute",
                                            backgroundColor: "white",
                                            left: "0",
                                            right: "0",
                                            margin: "auto",
                                            top: "0",
                                            bottom: "0",
                                            zIndex: "-1",
                                        }}
                                    />
                                </LogoContainer>
                                YouClone
                            </Link>
                        </Logo>

                        <SearchContainer>
                            <Search isMobile={false}>
                                <Input
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                                {search.length > 0 && (
                                    <CloseButton onClick={clearSearch}>
                                        <TfiClose />
                                    </CloseButton>
                                )}
                            </Search>
                            <SearchButton onClick={handleSearch}>
                                <MdSearch
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                />
                            </SearchButton>
                            <SearchButton
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    padding: "0px",
                                    marginLeft: "15px",
                                    border: "none",
                                }}>
                                <BiSolidMicrophone
                                    style={{
                                        fontSize: "1.25rem",
                                    }}
                                />
                            </SearchButton>
                        </SearchContainer>

                        {currentUser ? (
                            <User>
                                <SearchMobile
                                    onClick={() => setMobileSearch(true)}>
                                    <MdSearch
                                        style={{
                                            fontSize: "1.5rem",
                                        }}
                                    />
                                </SearchMobile>
                                <BiVideoPlus
                                    onClick={() => setOpen(true)}
                                    style={{
                                        fontSize: "1.5rem",
                                        cursor: "pointer",
                                    }}
                                />
                                <IoMdNotificationsOutline
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                />
                                {currentUser?.img ? (
                                    <Avatar
                                        src={currentUser.img}
                                        onClick={() => setLogoutMenu(true)}
                                    />
                                ) : (
                                    <NoImgURL
                                        onClick={() => setLogoutMenu(true)}
                                        color={
                                            COLORS[
                                                currentUser
                                                    ? avatarColor(
                                                          currentUser?.createdAt
                                                      )
                                                    : 0
                                            ]
                                        }>
                                        {currentUser?.name[0]}
                                    </NoImgURL>
                                )}

                                {/* {currentUser.name} */}
                            </User>
                        ) : (
                            <MobileSearchWrapper>
                                <SearchMobile
                                    onClick={() => setMobileSearch(true)}>
                                    <MdSearch
                                        style={{
                                            fontSize: "1.5rem",
                                        }}
                                    />
                                </SearchMobile>
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
                            </MobileSearchWrapper>
                        )}
                    </Wrapper>
                </Container>
            )}
            {open && (
                <UploadVideo setOpen={setOpen} userId={currentUser?._id} />
            )}
            {logoutMenu && (
                <LogoutMenu
                    setLogoutMenu={setLogoutMenu}
                    name={currentUser?.name}
                    image={currentUser?.img}
                    email={currentUser?.email}
                    createdAt={currentUser?.createdAt}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            )}
        </>
    );
};

export default Navbar;
