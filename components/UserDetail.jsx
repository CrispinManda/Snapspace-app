import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ListGroup, Container } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { fetchUserById, fetchAlbumsByUser } from '../services/api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetchUserById(id);
        setUser(userRes.data);

        const albumRes = await fetchAlbumsByUser(id);
        setAlbums(albumRes.data);

        setLoading(false); 
      } catch (error) {
        console.error('Failed to load data', error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]);

  
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <BeatLoader color="red" /> 
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>{user.name}</h1>
      <ListGroup>
        {albums.map((album) => (
          <ListGroup.Item key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserDetail;
