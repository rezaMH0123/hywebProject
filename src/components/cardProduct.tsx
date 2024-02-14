interface Product {
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  rate: number;
  title: string;
  view: number;
}

interface CardProductProps {
  product: Product;
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <div
      dir="rtl"
      className="h-[46%] w-[23%] rounded-md  shadow-3xl text-right font-custom"
    >
      <div className="h-[46%] ">
        <img
          src={product.imageUrl}
          alt="cardimg"
          className="w-full h-full rounded-t-md"
        />
      </div>
      <div className="flex flex-col p-2">
        <h2 className="text-black text-sm text-right">{product.title}</h2>
        <p className="text-xs text-[#5C5C5C] mt-3">{product.description}</p>
        <div className="price flex gap-x-2 items-center mt-6">
          <span className="text-xs text-[#A0A0A0] ">قیمت:</span>
          <span className="font-faNUm">{product.price}</span>
        </div>
      </div>
    </div>
  );
}
