import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineLibraryAddCheck } from "react-icons/md";

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.bg};
    padding: 4px;
    display: flex;
    gap: 6px;
    @media (min-width: 1050px) {
        flex-direction: column;
    }
    @media (max-width: 1050px) {
        justify-content: space-around;
        position: sticky;
        borttom: 0;
        left: 0;
        height: 62px;
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    color: ${({ theme }) => theme.text};
    font-size: 0.6rem;
    &:hover {
        background-color: ${({ theme }) => theme.softClick};
    }
    @media (max-width: 1050px) {
        padding: 8px;
        gap: 4px;
        width: 74px;
    }
`;

const IconsMenu = () => {
    return (
        <Wrapper>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Item>
                    <MdOutlineHome size="22px" />
                    Home
                </Item>
            </Link>
            <Link
                to="trends"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Item>
                    <MdOutlineExplore size="22px" />
                    Explore
                </Item>
            </Link>
            <Link
                to="subscriptions"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Item>
                    <MdOutlineSubscriptions size="22px" />
                    Subscriptions
                </Item>
            </Link>
            <Item>
                <MdOutlineLibraryAddCheck size="22px" />
                Library
            </Item>
        </Wrapper>
    );
};

export default IconsMenu;
