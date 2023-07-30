export default function CollegeReview({ review }) {
  const starImageArray = Array.from({
    length: review.rating,
  });

  return (
    <div className="college-review">
      <h4 className="rating">
        {review.first_name} {review.last_name}, Class of{" "}
        {review.college_grad_year}
        <div className="stars">
        {" "}{starImageArray.map((_, i) => (
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
      </h4>
      <h4>Review: {review.review}</h4>
      
    </div>
  );
}
