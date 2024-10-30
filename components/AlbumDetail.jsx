import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners'; 
import { fetchPhotosByAlbum, updatePhotoTitle } from '../services/api';

const AlbumDetail = () => {
  const { id } = useParams(); 
  const [photos, setPhotos] = useState([]); 
  const [editPhotoId, setEditPhotoId] = useState(null); 
  const [newTitle, setNewTitle] = useState(''); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetchPhotosByAlbum(id);
        setPhotos(res.data);
        setLoading(false); 
      } catch (error) {
        console.error('Failed to load photos', error);
        setLoading(false); 
      }
    };

    fetchPhotos();
  }, [id]);

  
  const handleTitleUpdate = async (photoId) => {
    try {
      await updatePhotoTitle(photoId, newTitle); 
      
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === photoId ? { ...photo, title: newTitle } : photo
        )
      );
      setEditPhotoId(null); 
      setNewTitle(''); 
    } catch (error) {
      console.error('Failed to update title', error);
    }
  };

  
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
      <h1>Photos</h1>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className='h-100' style={{ width: '100%' }}>
              <Card.Img variant="top" src={photo.url} alt={photo.title} />
              <Card.Body>
                {editPhotoId === photo.id ? (
                  <>
                    <Form.Group controlId={`editPhoto-${photo.id}`}>
                      <Form.Label>Edit Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={() => handleTitleUpdate(photo.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="ml-2"
                      onClick={() => setEditPhotoId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Title>{photo.title}</Card.Title>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setEditPhotoId(photo.id); 
                        setNewTitle(photo.title);
                      }}
                    >
                      Edit Title 
                      <span> &nbsp;&nbsp;
                        <i className="fa fa-edit" />
                      </span>
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AlbumDetail;
