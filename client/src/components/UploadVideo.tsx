import { FormEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 700px) {
        padding: 10px;
    }
`;
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    @media (max-width: 700px) {
        width: 100%;
    }
`;
const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;
const Title = styled.h1`
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Desc = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Button = styled.button`
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

const Label = styled.label`
    font-size: 14px;
`;

const Uploaded = styled.p`
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const UploadVideo = ({ setOpen, userId }: UploadVideoProps) => {
    const [img, setImg] = useState<File>();
    const [video, setVideo] = useState<File>();
    const [imgPercentage, setImgPercentage] = useState(0);
    const [videoPercentage, setVideoPercentage] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setInputs((prev) => {
            return { ...prev, [target.name]: target.value };
        });
    };

    const handleTags = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setTags(target.value.split(","));
    };

    const uploadFile = (file: File | undefined, urlType: string) => {
        if (file) {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    urlType === "imgUrl"
                        ? setImgPercentage(Math.round(progress))
                        : setVideoPercentage(Math.round(progress));
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setInputs((prev) => {
                                return { ...prev, [urlType]: downloadURL };
                            });
                        }
                    );
                }
            );
        }
    };
    useEffect(() => {
        uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://api.youclone-project.com/api/videos",
                {
                    ...inputs,
                    tags,
                    userId,
                }
            );
            setOpen(false);
            res.status === 200 && navigate("/");
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <Container onClick={() => setOpen(false)}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <Close onClick={() => setOpen(false)}>
                    <TfiClose />
                </Close>
                <Title>Upload a new video</Title>
                <Label>Video:</Label>
                {video ? (
                    <Uploaded>
                        <BsCheckCircle
                            style={{
                                fontSize: "1.2rem",
                                color: "green",
                            }}
                        />
                        Success
                    </Uploaded>
                ) : videoPercentage > 0 && videoPercentage < 100 ? (
                    "Uploading" + videoPercentage + "%"
                ) : (
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files![0])}
                    />
                )}
                <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                />
                <Desc
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separate the tags with commas."
                    onChange={handleTags}
                />
                <Label>Image:</Label>
                {img && imgPercentage >= 100 ? (
                    <Uploaded>
                        <BsCheckCircle
                            style={{
                                fontSize: "1.2rem",
                                color: "green",
                            }}
                        />
                        Success
                    </Uploaded>
                ) : imgPercentage > 0 && imgPercentage < 100 ? (
                    "Uploading" + imgPercentage + "%"
                ) : (
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files![0])}
                    />
                )}

                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    );
};

export default UploadVideo;
