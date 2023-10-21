import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SingleComment from "./SingleComment";
import axios from "axios";
import { COLORS, avatarColor } from "../utils/AvatarColor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Container = styled.div``;

const NewComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #777;
    flex-shrink: 0;
`;
const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.softClick};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
    font-size: 14px;
    color: ${({ theme }) => theme.text};
`;

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;

const CommentButton = styled.button`
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

const CancelButton = styled.button`
    background-color: transparent;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    border: none;
    border-radius: 24px;
    height: max-content;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
        background-color: ${({ theme }) => theme.softClick};
    }
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

const Comments = ({
    videoId,
    userImage,
    userName,
    createdAt,
}: CommentsProps) => {
    const [comments, setComments] = useState<CommentsDataType[] | []>([]);
    const [commentButtons, setCommentButtons] = useState(false);
    const [userComment, setUserComment] = useState("");

    const navigate = useNavigate();

    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(
                    `https://api.youclone-project.com/api/comments/${videoId}`
                );
                setComments(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
    }, [videoId, commentButtons]);

    const showCommentButtons = () => {
        if (currentUser?.name) {
            setCommentButtons(true);
        } else {
            navigate("/signin");
        }
    };

    const handleCancel = () => {
        setCommentButtons(false);
        setUserComment("");
    };
    const handleComment = async () => {
        await axios.post("https://api.youclone-project.com/api/comments", {
            videoId,
            desc: userComment,
            id: currentUser?._id,
        });
        setUserComment("");
        setCommentButtons(false);
    };
    return (
        <Container>
            <NewComment>
                <FlexContainer>
                    {currentUser?.img ? (
                        <Avatar src={currentUser.img} />
                    ) : (
                        <NoImgURL
                            color={
                                COLORS[
                                    currentUser?.createdAt
                                        ? avatarColor(currentUser.createdAt)
                                        : 0
                                ]
                            }>
                            {currentUser?.name && currentUser.name[0]}
                        </NoImgURL>
                    )}
                    <Input
                        placeholder="Add a comment"
                        onClick={showCommentButtons}
                        onChange={(e) => setUserComment(e.target.value)}
                        value={userComment}
                    />
                </FlexContainer>
                {commentButtons && (
                    <FlexContainer>
                        <CancelButton onClick={handleCancel}>
                            Cancel
                        </CancelButton>
                        <CommentButton onClick={handleComment}>
                            Comment
                        </CommentButton>
                    </FlexContainer>
                )}
            </NewComment>
            {comments.map((comment) => (
                <SingleComment key={comment._id} comment={comment} />
            ))}
        </Container>
    );
};

export default Comments;
