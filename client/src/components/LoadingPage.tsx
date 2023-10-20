import { styled } from "styled-components";

const Card = styled.div``;
const CardVideo = styled.div`
    width: 100%;
    height: 207px;
    background-color: ${({ theme }) => theme.button};
    border-radius: 10px;
`;
const CardInfoWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const CardText = styled.div`
    height: 20px;
    background-color: ${({ theme }) => theme.button};
`;
const CardTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
    width: 100%;
`;
const CardCannelLogo = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.button};
    flex-shrink: 0;
`;

const LoadingPage = () => {
    return (
        <Card>
            <CardVideo />
            <CardInfoWrapper>
                <CardCannelLogo />
                <CardTextWrapper>
                    <CardText />
                    <CardText style={{ width: "75%" }} />
                </CardTextWrapper>
            </CardInfoWrapper>
        </Card>
    );
};

// const LoadingCard = () => {
//     return (
//         <Card>
//             <CardVideo />
//             <CardInfoWrapper>
//                 <CardCannelLogo />
//                 <CardTextWrapper>
//                     <CardText />
//                     <CardText />
//                 </CardTextWrapper>
//             </CardInfoWrapper>
//         </Card>
//     );
// };

export default LoadingPage;
