import { styled } from "styled-components";
import { MdOutlineAccountBox } from "react-icons/md";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import axios from "axios";
import { logout } from "../redux/userSlice";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineLightMode } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { FaRegKeyboard } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { COLORS, avatarColor } from "../utils/AvatarColor";

type Props = {
    disabled: boolean;
};

type Color = {
    color: string;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: start;
    justify-content: flex-end;
    padding: 50px 30px;
`;
const Wrapper = styled.div`
    width: 300px;
    height: 100%;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.textSoft};
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
`;

const Text = styled.h1`
    font-size: 1rem;
    font-weight: 300;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #999;
`;
const UserInfoWrapper = styled.div`
    display: flex;
    gap: 15px;
    align-itams: center;
    padding: 20px;
`;
const UserInfoText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${({ theme }) => theme.text};
`;
const Hr = styled.hr`
    margin: 8px 0px;
    border: 0.5px solid ${({ theme }) => theme.softClick};
`;
const ItemWrapper = styled.div`
    overflow: scroll;
`;
const Item = styled.div<Props>`
    display: flex;
    align-items: center;
    gap: 16px;
    color: ${(props) => !props.disabled && (({ theme }) => theme.text)};
    cursor: pointer;
    padding: 10px 15px;
    font-size: 0.9rem;
    &:hover {
        background-color: ${({ theme }) => theme.softClick};
    }
`;
const NoImgURL = styled.div<Color>`
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

const useAppDispatch: () => AppDispatch = useDispatch;

const LogoutMenu = ({
    setLogoutMenu,
    name,
    image,
    email,
    createdAt,
    darkMode,
    setDarkMode,
}: LogoutMenuType) => {
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        try {
            await axios.get("https://api.youclone-project.com/api/auth/logout");
            setLogoutMenu(false);
            dispatch(logout());
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container onClick={() => setLogoutMenu(false)}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                {/* <Close onClick={() => setLogoutMenu(false)}>
                    <TfiClose />
                </Close> */}
                <UserInfoWrapper>
                    {image ? (
                        <Avatar src={image} />
                    ) : (
                        <NoImgURL
                            onClick={() => setLogoutMenu(true)}
                            color={
                                COLORS[createdAt ? avatarColor(createdAt) : 0]
                            }>
                            {name && name[0]}
                        </NoImgURL>
                    )}
                    <UserInfoText>
                        <Text>{name}</Text>
                        <Text>{email}</Text>
                    </UserInfoText>
                </UserInfoWrapper>
                <Hr />
                <ItemWrapper>
                    <Item disabled={true}>
                        <MdOutlineAccountBox size="20px" />
                        Your channel
                    </Item>
                    <Item disabled={true}>
                        <AiOutlinePlaySquare size="20px" />
                        YouClone Studio
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineSwitchAccount size="20px" />
                        Switch account
                    </Item>
                    <Item onClick={handleLogout} disabled={false}>
                        <MdLogout size="20px" />
                        Sign out
                    </Item>
                    <Hr />
                    <Item disabled={true}>
                        <AiOutlineDollarCircle size="20px" />
                        Purchases and memberships
                    </Item>
                    <Item disabled={true}>
                        <AiOutlineSafety size="20px" />
                        Your data on YouClone
                    </Item>
                    <Hr />
                    <Item
                        onClick={() => setDarkMode(!darkMode)}
                        disabled={false}>
                        <MdOutlineLightMode size="20px" />
                        {darkMode ? "Light" : "Dark"} Mode
                    </Item>
                    <Item disabled={true}>
                        <IoLanguageOutline size="20px" />
                        Language: English
                    </Item>
                    <Item disabled={true}>
                        <AiOutlineSafety size="20px" />
                        Restricted Mode: Off
                    </Item>
                    <Item disabled={true}>
                        <CiGlobe size="20px" />
                        Location: Canada
                    </Item>
                    <Item disabled={true}>
                        <FaRegKeyboard size="20px" />
                        Keyboard shortcuts
                    </Item>
                    <Hr />
                    <Item disabled={true}>
                        <MdOutlineSettings size="20px" />
                        Settings
                    </Item>
                    <Hr />
                    <Item disabled={true}>
                        <MdHelpOutline size="20px" />
                        Help
                    </Item>
                    <Item disabled={true}>
                        <MdOutlineReportProblem size="20px" />
                        Send feedback
                    </Item>
                </ItemWrapper>
            </Wrapper>
        </Container>
    );
};

export default LogoutMenu;
