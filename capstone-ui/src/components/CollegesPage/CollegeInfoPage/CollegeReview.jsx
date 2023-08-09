export default function CollegeReview({ review }) {
  const starImageArray = Array.from({
    length: review.rating,
  });

  return (
    <div className="college-review">
      <span className="rating">
        <div className="rating-info">
          <b>
            {review.first_name} {review.last_name}
          </b> 
          {review.college_grad_year?
          ", Class of " + review.college_grad_year: null}
        </div>
      </span>
      <div className="stars">
        {" "}
        {starImageArray.map((_, i) => (
          <img
            className="star-img"
            src={
              "https://em-content.zobj.net/thumbs/240/apple/354/star_2b50.png"
            }
            key={i}
            alt={`Star Rating Icon ${i + 1}`}
          />
        ))}
      </div>
      <span className="rating-desc">
        <b>Review:</b> {review.review}
      </span>
    </div>
  );
}
