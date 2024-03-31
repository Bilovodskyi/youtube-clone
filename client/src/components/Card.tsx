import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { isVideoPageTrue, menuFalse } from "../redux/menuSlice";
import axios from "axios";
import { COLORS, avatarColor } from "../utils/AvatarColor";

type Props = {
    type: string | undefined;
    color?: string;
};

const Container = styled.div<Props>`
    margin-bottom: ${(props) => (props.type === "small" ? "10px" : "45px")};
    cursor: pointer;
    display: ${(props) => (props.type ? "flex" : "block")};
    gap: ${(props) => (props.type === "small" || "search") && "20px"};
`;

const Image = styled.img<Props>`
    width: ${(props) => (props.type === "small" ? "168px" : "100%")};
    height: ${(props) => (props.type === "small" ? "94px" : "207px")};
    background-color: #999;
    flex: ${(props) => props.type !== "small" && "1"};
    border-radius: 10px;
    object-fit: cover;
`;

const Details = styled.div<Props>`
    display: flex;
    margin-top: ${(props) => props.type !== "small" && "16px"};
    gap: 12px;
    flex: 1;
`;

const ChannelImage = styled.img<Props>`
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "small" && "none"};
`;

const NoImgURL = styled.div<Props>`
    width: 36px;
    height: 36px;
    display: ${(props) => (props.type === "small" ? "none" : "flex")};
    flex-shrink: 0;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
`;

const Texts = styled.div``;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const ChannelNameDesktop = styled.h2`
    font-size: 14px;
    font-weight: 400;
    color: #888;
    margin: 8px 0px 4px 0px;
    @media (max-width: 700px) {
        display: none;
    }
`;

const ChannelNameMobile = styled.h2`
    font-size: 14px;
    font-weight: 400;
    color: #888;
    margin-right: 5px;
    @media (min-width: 700px) {
        display: none;
    }
`;

const Info = styled.div`
    font-size: 14px;
    color: #888;
    display: flex;
    align-items: center;
`;

const useAppDispatch: () => AppDispatch = useDispatch;

const Card = ({ type, video }: CardProps) => {
    const [channel, setChannel] = useState<ChannelProps | undefined>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER}/api/users/find/${video?.userId}`
            );
            setChannel(res.data);
        };
        fetchVideos();
    }, [video?.userId]);

    const handleOpenCard = () => {
        dispatch(menuFalse());
        dispatch(isVideoPageTrue());
    };

    return (
        <Link
            to={`/video/${video._id}`}
            style={{ textDecoration: "none" }}
            onClick={handleOpenCard}>
            <Container type={type}>
                <Image type={type} src={video?.imgUrl} />
                <Details type={type}>
                    {channel?.img ? (
                        <ChannelImage type={type} src={channel?.img} />
                    ) : (
                        <NoImgURL
                            type={type}
                            color={
                                COLORS[
                                    channel
                                        ? avatarColor(channel?.createdAt)
                                        : 0
                                ]
                            }>
                            {channel?.name[0]}
                        </NoImgURL>
                    )}
                    <Texts>
                        <Title>
                            {video?.title.length > 50
                                ? video?.title.substring(0, 50) + "..."
                                : video?.title}
                        </Title>
                        <ChannelNameDesktop>{channel?.name}</ChannelNameDesktop>
                        <Info>
                            <ChannelNameMobile>
                                {channel?.name} •
                            </ChannelNameMobile>
                            {video?.views} views • {format(video?.createdAt)}
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
};

export default Card;
