import { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { COLORS, avatarColor } from "../utils/AvatarColor";

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #777;
    flex-shrink: 0;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`;

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
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

const Text = styled.span``;

type SingleCommentType = {
    comment: CommentsDataType;
};

const SingleComment = ({ comment }: SingleCommentType) => {
    const [channel, setChannel] = useState<ChannelType | undefined>();

    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.get(
                `https://api.youclone-project.com/api/users/find/${comment.userId}`
            );
            setChannel(res.data);
        };
        fetchComment();
    }, []);
    return (
        <Container>
            {channel?.img ? (
                <Avatar src={channel.img} />
            ) : (
                <NoImgURL
                    color={
                        COLORS[
                            channel?.createdAt
                                ? avatarColor(channel?.createdAt)
                                : 0
                        ]
                    }>
                    {channel?.name[0]}
                </NoImgURL>
            )}
            <Details>
                <Name>
                    {channel?.name} <Date>{format(comment.createdAt)}</Date>
                </Name>
                <Text>{comment.desc}</Text>
            </Details>
        </Container>
    );
};

export default SingleComment;
