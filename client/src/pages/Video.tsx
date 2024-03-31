import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { MdOutlineThumbUp } from "react-icons/md";
import { FiScissors } from "react-icons/fi";
import { MdThumbUp } from "react-icons/md";
import { MdOutlineThumbDown } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import { BsReply } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import Comments from "../components/Comments";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { dislike, fetchSuccess, like, view } from "../redux/videoSlice";
import { format } from "timeago.js";
import GitHubBanner from "../components/GitHubBanner";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import axios from "axios";
import { COLORS, avatarColor } from "../utils/AvatarColor";

type Props = {
    type: boolean;
};

const Container = styled.div`
    display: flex;
    gap: 24px;
    @media (max-width: 1050px) {
        flex-direction: column;
    }
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 550px;
    width: 950px;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 1050px) {
        width: 100%;
        height: 360px;
    }
    @media (max-width: 480px) {
        height: 240px;
    }
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin: 20px 0px 10px 0px;
    color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1050px) {
        flex-direction: column;
        gap: 15px;
    }
`;

const Info = styled.span`
    display: flex;
    gap: 4px;
`;

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    color: ${({ theme }) => theme.text};
    @media (max-width: 1050px) {
        width: 100%;
        gap: 0px;
        justify-content: space-between;
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.button};
    padding: 10px 15px;
    border-radius: 24px;
    &:hover {
        background-color: ${({ theme }) => theme.softClick};
    }
    @media (max-width: 1050px) {
        padding: 8px 12px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    @media (max-width: 1050px) {
        justify-content: space-between;
    }
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #777;
    flex-shrink: 0;
`;

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
    font-weight: 500;
`;

const ChannelCounter = styled.span`
    margin-top: 5px;
    color: ${({ theme }) => theme.textSoft};
    font-size: 12px;
`;

const Description = styled.p`
    font-size: 14px;
    margin-top: 5px;
    line-height: 20px;
`;

const Subscribe = styled.button<Props>`
    background-color: ${(props) =>
        props.type ? ({ theme }) => theme.button : ({ theme }) => theme.text};
    font-weight: 500;
    color: ${(props) =>
        props.type
            ? ({ theme }) => theme.text
            : ({ theme }) => theme.textOposite};
    border: none;
    border-radius: 24px;
    height: max-content;
    padding: 12px 15px;
    cursor: pointer;
    font-size: 0.9rem;
`;

const DescriptionContainer = styled.div<Props>`
    background-color: ${({ theme }) => theme.button};
    margin: 20px 0px;
    width: 100%;
    padding: 15px;
    cursor: ${(props) => (props.type !== true ? "pointer" : "auto")};
    border-radius: 8px;
    color: ${({ theme }) => theme.text};
    &:hover {
        background-color: ${(props) =>
            props.type !== true
                ? ({ theme }) => theme.softClick
                : ({ theme }) => theme.button};
`;

const VideoFrame = styled.video`
    min-width: 100%;
    min-height: 100%;
    cursor: pointer;
`;

const NoImgURL = styled.div`
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

const Video = () => {
    const [channel, setChannel] = useState<ChannelType | undefined>();
    const [readMore, setReadMore] = useState(false);
    const [videoView, setVideoView] = useState(true);

    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );

    const currentVideo = useSelector(
        (state: RootState) => state.video.currentVideo
    );

    const dispatch = useAppDispatch();

    const path = useLocation().pathname.split("/")[2];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(
                    `${import.meta.env.VITE_SERVER}/api/videos/find/${path}`
                );
                const channelRes = await axios.get(
                    `${import.meta.env.VITE_SERVER}/api/users/find/${
                        videoRes.data.userId
                    }`
                );
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            } catch (err: any) {
                console.log(err);
            }
        };
        fetchData();
    }, [path]);

    const handleLike = async () => {
        if (currentUser) {
            try {
                await axios.put(
                    `${import.meta.env.VITE_SERVER}/api/users/like/${
                        currentVideo?._id
                    }`,
                    {
                        id: currentUser?._id,
                    }
                );
                dispatch(like(currentUser?._id));
            } catch (err: any) {
                console.log(err);
            }
        } else {
            navigate("/signin");
        }
    };

    const handleDislike = async () => {
        if (currentUser) {
            try {
                await axios.put(
                    `${import.meta.env.VITE_SERVER}/api/users/dislike/${
                        currentVideo?._id
                    }`,
                    {
                        id: currentUser?._id,
                    }
                );
                dispatch(dislike(currentUser?._id));
            } catch (err: any) {
                console.log(err);
            }
        } else {
            navigate("/signin");
        }
    };

    const handleSub = async () => {
        if (currentUser) {
            try {
                currentUser?.subscribedUsers.includes(channel?._id!)
                    ? await axios.put(
                          `${import.meta.env.VITE_SERVER}/api/users/unsub/${
                              channel?._id
                          }`,
                          {
                              id: currentUser?._id,
                          }
                      )
                    : await axios.put(
                          `${import.meta.env.VITE_SERVER}/api/users/sub/${
                              channel?._id
                          }`,
                          {
                              id: currentUser?._id,
                          }
                      );
                dispatch(subscription(channel?._id));
            } catch (err: any) {
                console.log(err);
            }
        } else {
            navigate("/signin");
        }
    };

    const handleViewIncrease = async () => {
        if (videoView) {
            try {
                await axios.get(
                    `${import.meta.env.VITE_SERVER}/api/videos/view/${
                        currentVideo?._id
                    }`
                );
                dispatch(view);
            } catch (err: any) {
                console.log(err);
            }
            setVideoView(false);
        }
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    {/* <iframe
                        width="100%"
                        height="520"
                        frameBorder={0}
                        src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: "8px" }}></iframe> */}
                    <VideoFrame
                        src={currentVideo?.videoUrl}
                        controls
                        onPlay={handleViewIncrease}
                    />
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Details>
                    <ChannelInfo>
                        <div style={{ display: "flex", gap: "20px" }}>
                            {channel?.img ? (
                                <Image src={channel.img} />
                            ) : (
                                <NoImgURL
                                    color={
                                        COLORS[
                                            channel?.createdAt
                                                ? avatarColor(
                                                      channel?.createdAt
                                                  )
                                                : 0
                                        ]
                                    }>
                                    {channel?.name[0]}
                                </NoImgURL>
                            )}
                            <ChannelDetail>
                                <ChannelName>{channel?.name}</ChannelName>
                                <ChannelCounter>
                                    {channel?.subscribers} subscribers
                                </ChannelCounter>
                            </ChannelDetail>
                        </div>

                        {currentUser?.subscribedUsers.includes(
                            channel?._id!
                        ) ? (
                            <Subscribe type={true} onClick={handleSub}>
                                SUBSCRIBED
                            </Subscribe>
                        ) : (
                            <Subscribe type={false} onClick={handleSub}>
                                SUBSCRIBE
                            </Subscribe>
                        )}
                    </ChannelInfo>
                    <Buttons>
                        <ButtonContainer>
                            <Button
                                onClick={handleLike}
                                style={{
                                    borderRadius: "24px 0px 0px 24px",
                                    position: "relative",
                                    paddingRight: "15px",
                                }}>
                                {currentVideo?.likes.includes(
                                    currentUser?._id ?? ""
                                ) ? (
                                    <MdThumbUp />
                                ) : (
                                    <MdOutlineThumbUp />
                                )}
                                {currentVideo?.likes.length}
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "1px",
                                        height: "60%",
                                        right: "0",
                                        backgroundColor: "#555",
                                    }}
                                />
                            </Button>
                            <Button
                                onClick={handleDislike}
                                style={{
                                    borderRadius: "0px 24px 24px 0px",
                                    paddingLeft: "15px",
                                }}>
                                {currentVideo?.dislikes.includes(
                                    currentUser?._id ?? ""
                                ) ? (
                                    <MdThumbDown
                                        style={{ fontSize: "1.2rem" }}
                                    />
                                ) : (
                                    <MdOutlineThumbDown
                                        style={{ fontSize: "1.2rem" }}
                                    />
                                )}
                            </Button>
                        </ButtonContainer>
                        <Button>
                            <BsReply style={{ fontSize: "1.2rem" }} /> Share
                        </Button>
                        <Button>
                            <FiScissors />
                            Clip
                        </Button>
                        <Button>
                            <MdOutlinePlaylistAdd
                                style={{ fontSize: "1.2rem" }}
                            />
                            Save
                        </Button>
                    </Buttons>
                </Details>

                <Channel>
                    <DescriptionContainer type={readMore}>
                        {currentVideo && (
                            <Info>
                                {currentVideo.views} views •{" "}
                                {format(currentVideo.createdAt)}
                                {currentVideo.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: "0.8rem",
                                            color: "#999",
                                            display: "flex",
                                            alignItems: "center",
                                            margin: "0px 2px",
                                        }}>
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </Info>
                        )}

                        {currentVideo?.desc &&
                        currentVideo?.desc.length > 200 ? (
                            readMore ? (
                                <Description>
                                    {
                                        <>
                                            <p>{currentVideo?.desc}</p>
                                            <p
                                                onClick={() =>
                                                    setReadMore(false)
                                                }
                                                style={{ cursor: "pointer" }}>
                                                Show less
                                            </p>
                                        </>
                                    }
                                </Description>
                            ) : (
                                <Description onClick={() => setReadMore(true)}>
                                    {
                                        <>
                                            <p>
                                                {currentVideo?.desc.substring(
                                                    0,
                                                    200
                                                )}
                                            </p>{" "}
                                            <p>...more</p>
                                        </>
                                    }
                                </Description>
                            )
                        ) : (
                            <Description>{currentVideo?.desc}</Description>
                        )}
                    </DescriptionContainer>
                </Channel>

                <Comments videoId={currentVideo?._id} />
            </Content>
            <Recommendation
                tags={currentVideo?.tags}
                videoId={currentVideo?._id}>
                <GitHubBanner />
            </Recommendation>
        </Container>
    );
};

export default Video;
