import { styled } from "styled-components";
import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import LoadingPage from "../components/LoadingPage";

type Props = {
    width: number;
};

const Container = styled.div<Props>`
    display: grid;
    grid-template-columns: ${(props) =>
        props.width > 1200 ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
    gap: 16px;
    @media (max-width: 1050px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const Home = ({ type }: HomeProps) => {
    const [videos, setVideos] = useState([]);
    const [width, setWidth] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const menu = useSelector((state: RootState) => state.menu.menu);

    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }
    }, [menu]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER}/api/videos/${type}`,
                    {
                        data: { id: currentUser?._id },
                    }
                );
                setVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchVideos();
    }, [type]);

    return (
        <Container width={width} ref={ref}>
            {videos.length > 0 ? (
                videos.map((video: any) => (
                    <Card key={video._id} type={undefined} video={video} />
                ))
            ) : (
                <>
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                    <LoadingPage />
                </>
            )}
        </Container>
    );
};

export default Home;
