import {useEffect, useState} from 'react'
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom'

export const ReviewEditForm = ({setReviews, reviews, userInfo}) => {
    const { user } = useOutletContext()
    const navigate = useNavigate()
    const URL = import.meta.env.VITE_BASE_URL;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
    const day = currentDate.getDate();
  
    
    const { teapot_id, review_id } = useParams()
    
    const [updatedReview, setUpdatedReview] = useState({
        content: '',
        rating: '',
        updated_at: '',
    })
  

    const handleSubmit = (event) => {
      event.preventDefault()
       handleEdit(updatedReview)
       navigate(`/teapots/${teapot_id}`)
      }

        updatedReview.updated_at = `${year}-${month}-${day}`


      const handleEdit = (updatedReview) => {
        const csrfToken = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN=")).split("=")[1];
        
        if(updatedReview.content.length > 0 && updatedReview.rating.length > 0) {

          fetch(`${URL}/api/teapots/${teapot_id}/reviews/${review_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "CSRF-Token": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify(updatedReview),
          })
          .then((response) => response.json())
          .then((responseJSON) => {
            const copyReviewArray = [...reviews]
            const indexUpdatedReview = copyReviewArray.findIndex((review) => {
              return review.id === review_id
            })
            copyReviewArray[indexUpdatedReview] = responseJSON
            setReviews(copyReviewArray)
            setUpdatedReview({
              content: '',
              rating: '',
              updated_at: ``
            })
          })
          .catch((error) => console.error(error))
        } else {
          alert(`Invalid Inputs`)
          navigate(`/teapots/${teapot_id}`)
        }
      }
        


      const handleTextChange = (event) => {
        setUpdatedReview({
          ...updatedReview,
          [event.target.id]: event.target.value,
        })
      }

      useEffect(() => {
        const csrfToken = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN=")).split("=")[1]; 
        fetch(`${URL}/api/teapots/${teapot_id}/reviews/${review_id}`, {
            credentials: "include"
            }).then(res => res.json()).then(data => setUpdatedReview(data.review)).catch(error => console.error(error))
      }, [])


    return (
      
      <div>
      {/* {children} */}
      <div>
        <label htmlFor="content">Review:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={updatedReview.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          name="rating"
          min="1"
          max="5"
          step="1"
          value={updatedReview.rating}
          onChange={handleTextChange}
          required
        />
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        <input type="submit" />
      </form>
      <Link to={`/teapots/${teapot_id}`}>Cancel</Link>
    </div>
    
    )
}