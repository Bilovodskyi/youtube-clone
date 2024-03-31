import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Card from "./Card";
import axios from "axios";

const Container = styled.div`
    flex: 2;
`;

const Recommendation = ({ tags, videoId, children }: RecommendationProps) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER}/api/videos/tags?tags=${tags}`
            );
            setVideos(res.data);
        };
        fetchVideos();
    }, []);
    return (
        <Container>
            {children}
            {videos
                .filter((video: any) => video._id !== videoId)
                .map((video: any) => (
                    <Card type="small" key={video._id} video={video} />
                ))}
        </Container>
    );
};

export default Recommendation;
