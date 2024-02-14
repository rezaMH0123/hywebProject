import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import logOutIMG from "../assets/logout.svg";
import plusIMG from "../assets/plus.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import CardProduct from "../components/cardProduct";
import emptyProduct from "../assets/empty.svg";
import Modal from "../components/modal";
import { CircularProgress } from "@mui/material";

export interface ProductData {
  list: [];
  totalRowCount: number;
  exception: null;
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [newItemadd, setNewItemadd] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    list: [],
    totalRowCount: 0,
    exception: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productCountinpaage = 8;
  const productsCount = 50;
  const startIndex = (page - 1) * productCountinpaage;
  const endIndex = startIndex + productCountinpaage;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const logOutHandler = () => {
    console.log("reza");
    Cookies.remove("refresh_token");
    Cookies.remove("access_token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  // const getProduct = async () => {
  //   const access = Cookies.get("access_token");
  //   try {
  //     const res = await axios.get(
  //       "/General/Product/ProductList?count=50&skip=0",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access}`,
  //         },
  //       }
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log("product api:", error);
  //   }
  // };

  const userName = localStorage.getItem("user");
  useEffect(() => {
    const checkTokenexpier = async () => {
      const refreshToken = Cookies.get("refresh_token");
      const accessToken = Cookies.get("access_token");
      const user = localStorage.getItem("user");
      if (!accessToken) {
        console.log("dont have access token");
        if (refreshToken) {
          try {
            const response = await axios.post(
              "/Security/UserLogin/RefreshToken",
              {
                userName: user,
                refreshToken: refreshToken,
              }
            );
            console.log(response);
            if (response.status === 200) {
              Cookies.set(
                "access_token",
                response.data.data.accessToken.access_token,
                {
                  expires: new Date(
                    response.data.data.accessToken.expire_access_token
                  ),
                }
              );
              Cookies.set(
                "refresh_token",
                response.data.data.accessToken.refresh_token,
                {
                  expires: new Date(
                    response.data.data.accessToken.expire_refresh_token
                  ),
                }
              );
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          window.location.href = "/login";
        }
      }
    };
    checkTokenexpier();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const access = Cookies.get("access_token");
      try {
        setLoading(true);
        const res = await axios.get(
          `/General/Product/ProductList?count=${productsCount}&skip=0`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        if (res.status === 200) {
          setProductData(res?.data?.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("product api:", error);
      }
    };
    getProducts();
  }, [newItemadd]);

  return (
    <div className="px-10 py-2 h-screen">
      <div className="flex justify-between items-center border-b border-[#A0A0A0] h-[10%]">
        <div className="flex items-center gap-x-8 h-full w-[40%]">
          <div
            onClick={logOutHandler}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <span className="text-[#FF6666] font-custom">خروج</span>
            <img
              className="w-[20px] h-[20px]"
              src={logOutIMG}
              alt="logOutIMG"
            />
          </div>
          <div>
            <span className="text-[#5C5C5C] font-custom">
              {userName?.replace(/^"|"$/g, "")}
            </span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setModal(true)}
              className="flex justify-center items-center gap-x-2 text-white w-[266px] h-[47px] rounded-lg bg-[#46B666]"
            >
              افزودن محصول
              <img className="h-[24px] w-[24-px]" src={plusIMG} alt="plusIMG" />
            </button>
          </div>
        </div>
        <div>
          <span className="font-custom text-[#5C5C5C]">لیست محصولات</span>
        </div>
      </div>
      <div className="h-[82%] pt-8">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress color="success" />
          </div>
        ) : (
          <>
            {productData?.totalRowCount !== 0 ? (
              <div className="cardsHolder h-full overflow-auto flex flex-wrap  gap-y-3 gap-x-8 ">
                {productData.list
                  .slice(startIndex, endIndex)
                  .map((product, index) => (
                    <CardProduct key={index} product={product} />
                  ))}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <img src={emptyProduct} alt="emptyProduct" />
              </div>
            )}
          </>
        )}
      </div>
      <div className=" flex items-center border-t border-[#A0A0A0] h-[8%] ">
        {Math.ceil(productData.totalRowCount / productCountinpaage) > 1 ? (
          <Stack spacing={2}>
            <Pagination
              page={page}
              onChange={handleChange}
              count={Math.ceil(productData.list.length / productCountinpaage)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        ) : (
          <></>
        )}
      </div>
      {modal ? (
        <Modal setModal={setModal} setNewItemadd={setNewItemadd} />
      ) : (
        <></>
      )}
    </div>
  );
}
