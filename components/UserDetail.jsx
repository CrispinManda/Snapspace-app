import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { fetchUserById, fetchAlbumsByUser, fetchPhotosByAlbum } from '../services/api';
import './UserDetail.css';

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
        const albumsWithPhotos = await Promise.all(
          albumRes.data.map(async (album) => {
            const photosRes = await fetchPhotosByAlbum(album.id);
            return {
              ...album,
              coverPhoto: photosRes.data[0]?.thumbnailUrl || '',
              photoCount: photosRes.data.length,
            };
          })
        );

        setAlbums(albumsWithPhotos);
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
    <Container className="full-height mt-4">
      <h1>{user.name}'s Albums</h1>
      <Row className="g-4">  {/* Added gap between columns */}
        {albums.map((album) => (
          <Col key={album.id} md={6} lg={4}>
            <Card className="h-100 border-0">
              <Row className="g-0">
                <Col md={4} className="p-2">
                  <Card.Img
                    src={album.coverPhoto}
                    alt={album.title}
                    className="img-fluid h-100 rounded-start"
                    style={{ objectFit: 'cover' }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/album/${album.id}`}>{album.title}</Link>
                    </Card.Title>
                    <Card.Text>{album.photoCount} photos</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserDetail;