import ReviewCard from "../ui/ReviewCard";

interface ReviewItem {
  name: string;
  comment: string;
  date: string;
  rating: number;
}

function RatingReview() {
  const reviews: ReviewItem[] = [
    {
      name: "Samantha D.",
      comment:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. It’s become my favorite go-to shirt!",
      date: "August 14, 2023",
      rating: 5,
    },
    {
      name: "John M.",
      comment:
        "The quality is good for the price. The color is slightly different from the photos, but still looks great.",
      date: "September 2, 2023",
      rating: 4,
    },
    {
      name: "Emily R.",
      comment:
        "Nice material and fits perfectly! I wish delivery was a bit faster, but overall I’m satisfied with the purchase.",
      date: "October 10, 2023",
      rating: 2,
    },
  ];

  return (
    <div className="w-full min-h-[300px] bg-gray-100 rounded-2xl p-5">
      <div className="w-full h-14 flex items-center">
        <p className="text-xl font-bold pr-2">All Reviews</p>
        <p className="text-sm text-zinc-600">({reviews.length})</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {reviews.map((val, index) => (
          <ReviewCard
            key={index}
            name={val.name}
            comment={val.comment}
            date={val.date}
            rating={val.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingReview;
