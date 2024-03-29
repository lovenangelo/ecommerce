import Icons from "@/lib/icons";

const Ratings = ({
  starCount,
  reviewCount,
}: {
  starCount: number;
  reviewCount: number;
}) => {
  const starArray = new Array(5).fill(0);

  const stars = starArray.map((star, index) => {
    if (index < starCount) {
      return <Icons.starIcon key={index} fill="#FF8C4B" stroke="#FF8C4B" />;
    }
    return <Icons.starIcon key={index} stroke="#FF8C4B" />;
  });

  return (
    <div className="flex items-end space-x-2 mt-2">
      <span className="flex">{stars}</span>
      <span className="text-[#B6B6B6]">{reviewCount} Ratings</span>
    </div>
  );
};

export default Ratings;
