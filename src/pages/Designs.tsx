import { useParams } from "react-router-dom";

export default function Designs() {
  const { gender, category } = useParams();

  const images = [];

  for (let i = 1; i <= 50; i++) {
    images.push(
      `/src/assets/${gender}/${category}/${i}.jpg`
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {category}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-xl">
            <img
              src={img}
              alt={`design-${index}`}
              className="w-full h-80 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}