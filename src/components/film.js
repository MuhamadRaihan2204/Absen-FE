import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchFilms,
  deleteFilm,
  createFilm,
  updateFilm,
  resetError,
} from "../redux/film";
import Button from "react-bootstrap/Button";
import "./film.css";

const FilmsPage = () => {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);
  const error = useSelector((state) => state.films.error);
  const [show, setShow] = useState(false);
  const [currentFilm, setCurrentFilm] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_thumbnail: null,
  });

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      }).then(() => {
        dispatch(resetError());
      });
    }
  }, [error, dispatch]);

  const handleClose = () => {
    setShow(false);
    setFormData({
      title: "",
      description: "",
      image_thumbnail: null,
    });
    setCurrentFilm(null);
  };

  const handleShow = (film = null) => {
    if (film) {
      setFormData({
        title: film.title,
        description: film.description,
        image_thumbnail: film.image_thumbnail,
      });
      setCurrentFilm(film);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.image_thumbnail && formData.image_thumbnail !== currentFilm?.image_thumbnail) {
      data.append("image_thumbnail", formData.image_thumbnail);
    }

    try {
      if (currentFilm) {
        await dispatch(updateFilm(currentFilm.id, data));
        Swal.fire("Updated!", "Film has been updated.", "success");
      } else {
        await dispatch(createFilm(data));
        Swal.fire("Added!", "Film has been added.", "success");
      }
      dispatch(fetchFilms());
      handleClose();
    } catch (err) {
      Swal.fire("Error!", "Failed to save film.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteFilm(id));
      Swal.fire("Deleted!", "Film has been deleted.", "success");
      dispatch(fetchFilms());
    } catch (err) {
      Swal.fire("Error!", "Failed to delete film.", "error");
    }
  };

  if (!films) return <p>Loading...</p>;

  return (
    <div className="films-page">
      <h1>Films</h1>
      <Button variant="primary" onClick={() => handleShow()}>
        Add Film
      </Button>
      <div className="films-list">
        {films.length === 0 ? (
          <p>No films available.</p>
        ) : (
          films.map((film) => (
            <div key={film.id} className="film-item">
              <h3>{film.title}</h3>
              <p>{film.description}</p>
              <video
                src={`http://localhost:5000/api/videos/${film.image_thumbnail}`}
                controls
                className="film-video"
              />
              <Button variant="warning" onClick={() => handleShow(film)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(film.id)}>
                Delete
              </Button>
            </div>
          ))
        )}
      </div>

      {show && (
        <div className="modal-film-overlay">
          <div className="modal-film">
            <div className="modal-film-header">
              <h5>{currentFilm ? "Edit Film" : "Add Film"}</h5>
              <button className="close-button" onClick={handleClose}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-film-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image_thumbnail">
                  Image Thumbnail (Video File)
                </label>
                <input
                  type="file"
                  name="image_thumbnail"
                  onChange={handleChange}
                  accept="video/*"
                />
              </div>
              <div className="modal-film-footer">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  {currentFilm ? "Update Film" : "Add Film"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmsPage;
