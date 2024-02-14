import { useState } from "react";
import closIMH from "../assets/close.svg";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

type ModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNewItemadd: React.Dispatch<React.SetStateAction<number>>;
};

export default function Modal({ setModal, setNewItemadd }: ModalProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accesstoken = Cookies.get("access_token");
    if (productName && price && description && imageFile) {
      try {
        setLoading(true);
        const respons = await axios.post(
          "/General/Product/AddProduct",
          {
            ProductTitle: productName,
            ProductPrice: price,
            Description: description,
            file: imageFile,
          },
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(respons);
        if (respons) {
          setLoading(false);
          toast.success("محصول با موفقیت ثبت شد");
          setNewItemadd((prev) => prev + 1);
          setModal(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("مشکلی رخ داده است");
      }
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      setImageFile(file);
    }
  };

  const exitMOdal = () => {
    setModal(false);
  };

  return (
    <div
      onClick={() => setModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex justify-center items-center bg-white p-8 rounded-lg w-[42%] h-[80%]"
      >
        <img
          onClick={() => setModal(false)}
          className="absolute top-2 left-2 cursor-pointer"
          src={closIMH}
          alt="closIMH"
        />

        <div dir="rtl" className=" h-[95%] w-[70%]">
          <span className="font-custom">افزودن محصول</span>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8">
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-[#A0A0A0] mb-2"
              >
                نام محصول
              </label>
              <input
                type="text"
                id="productName"
                className="border border-[#9A9A9A] outline-none w-full p-2 rounded-md"
                placeholder="نام محصول..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-[#A0A0A0] mb-2">
                قیمت محصول
              </label>
              <input
                type="number"
                id="price"
                className="border border-[#9A9A9A] outline-none w-full p-2 rounded-md"
                placeholder="قیمت محصول..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-[#A0A0A0] mb-2"
              >
                توضیحات
              </label>
              <textarea
                id="description"
                className="border border-[#9A9A9A] outline-none w-full p-2 rounded-md resize-none h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center border border-[#9A9A9A] outline-none w-full  rounded-md ">
                <span className="mr-4 overflow-hidden">
                  {imageName && imageName.length > 28
                    ? imageName.slice(0, 30) + "..."
                    : imageName}
                </span>
                <label
                  htmlFor="imageFile"
                  className="bg-[#C9C9C9] text-[#5C5C5C] p-2 px-6 rounded-md cursor-pointer"
                >
                  انتخاب فایل
                </label>
              </div>

              <input
                type="file"
                id="imageFile"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
            <div className="flex w-full">
              <button
                type="button"
                className=" w-[50%] py-2 text-[#5C5C5C] rounded-md"
                onClick={exitMOdal}
              >
                انصراف
              </button>
              {loading ? (
                <button
                  type="submit"
                  disabled={true}
                  className="bg-[#46B666] w-[50%] py-2 text-white rounded-md"
                >
                  صبر کنید...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#46B666] w-[50%] py-2 text-white rounded-md"
                >
                  ثبت محصول
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
