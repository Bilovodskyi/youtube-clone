import { Link } from "react-router-dom";
import { styled } from "styled-components";

const GitHubWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.border};
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
`;

const GitHubBunner = styled.img`
    width: 100%;
    height: 50%;
    object-fit: cover;
`;

const GitHubInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50%;
    padding: 0px 10px;
`;

const GitHubInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const GitHubLogo = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
`;

const GitHubName = styled.h1`
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
`;

const GitHubButton = styled.button`
    background-color: #3ea6ff;
    font-weight: 500;
    color: ${({ theme }) => theme.textOposite};
    border: none;
    border-radius: 24px;
    height: max-content;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 0.9rem;
`;

const GitHubLink = styled.p`
    color: ${({ theme }) => theme.textSoft};
    font-size: 0.8rem;
`;

const GitHubBanner = () => {
    return (
        <GitHubWrapper>
            <GitHubBunner src="/github-logo.webp" />
            <GitHubInfoContainer>
                <GitHubInfo>
                    <GitHubLogo src="/github-main-logo.png" />
                    <span>
                        <GitHubName>Bohdan Bilovodskyi</GitHubName>
                        <GitHubLink>github.com</GitHubLink>
                    </span>
                </GitHubInfo>
                <Link to="https://github.com/Bilovodskyi" target="blank">
                    <GitHubButton>View Profile</GitHubButton>
                </Link>
            </GitHubInfoContainer>
        </GitHubWrapper>
    );
};

export default GitHubBanner;
