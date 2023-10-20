import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 75%;
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;
    console.log(query);
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(
                `https://api.youclone-project.com/api/videos/search${query}`
            );
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);
    return (
        <Container>
            {videos.map((video: any) => (
                <Card key={video._id} video={video} type={"search"} />
            ))}
        </Container>
    );
};

export default Search;
