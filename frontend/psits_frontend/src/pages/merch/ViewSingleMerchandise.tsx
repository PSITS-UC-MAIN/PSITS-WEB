import { getMerchandiseItemById } from "@/api/merchandise";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { Maintenance } from "..";

const ViewSingleMerchandise = () => {
  const { merchandiseItemId } = useParams();

  const { data, isLoading } = useQuery(
    ["currentMerchItem", merchandiseItemId],
    () => getMerchandiseItemById(merchandiseItemId!),
    {
      select(merchData) {
        return merchData.item;
      },
    },
  );

  if (true) return <Maintenance />;

  if (isLoading) return <div>Loading...</div>;

  return (
    <Wrapper title="PSITS | Merch Title" className="my-20">
      <div className="flex gap-20">
        <div className="h-[600px] w-[800px]">
          <Slide>
            {data.images.map((slideImage: any) => (
              <div
                key={slideImage.imagePublicId}
                className="flex items-center justify-center h-[600px] w-[800px] bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${slideImage.image})` }}
              />
              // <img key={slideImage.imagePublicId} src={slideImage.image} className="w-full object-cover object-fill" />
            ))}
          </Slide>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3>Category</h3>
          <h1 className="text-6xl font-semibold">{data.name}</h1>
          <p className="font-medium text-lg">₱{data.price}.00</p>
          <Separator />
          <div className="h-[100px]">
            <p className="font-light">{data.description}</p>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <p className="">Size: M</p>
            <div className="flex items-center gap-2">
              {data.size.split(",").map((size: string) => (
                <Button key={size}>{size}</Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <p className="">Color: Black</p>
            <div className="flex items-center gap-2">
              {data.color.split(",").map((color: string) => (
                <div key={color} className={`h-[50px] w-[50px] border border-gray-500 bg-${color}`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <p className="">Quantity:</p>
            <div className="flex items-center">
              <Button variant="ghost">-</Button>
              <span>1</span>
              <Button variant="ghost">+</Button>
            </div>
          </div>
          <Button className="w-[50%] bg-[#268EA7] hover:bg-[#3da7c2] py-6">Add to cart</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewSingleMerchandise;
