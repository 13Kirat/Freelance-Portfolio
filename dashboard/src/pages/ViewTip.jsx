import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewTip = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tipImage, setTipImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getTip = async () => {
      await axios
        .get(`https://freelance-portfolio-production-8edc.up.railway.app/api/v1/tip/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.tip.title);
          setDescription(res.data.tip.description);
          setCategory(res.data.tip.category);
          setTipImage(res.data.tip.tipImage && res.data.tip.tipImage.url);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getTip();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  {tipImage && (
                    <img
                      src={tipImage}
                      alt="tipImage"
                      className="w-full h-auto"
                    />
                  )}
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <p>{description}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Category:</p>
                  <p>{category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTip;
