import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewTip = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tipImages, setTipImages] = useState([]);

  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getTip = async () => {
      try {
        const res = await axios.get(
          `https://freelance-portfolio-production-6486.up.railway.app/api/v1/tip/get/${id}`,
          { withCredentials: true }
        );

        const tip = res.data.tip;
        setTitle(tip.title);
        setDescription(tip.description);
        setCategory(tip.category);

        // ✅ Handle array of images safely
        if (Array.isArray(tip.images) && tip.images.length > 0) {
          setTipImages(tip.images.map((img) => img.url));
        } else {
          setTipImages([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load tip");
      }
    };
    getTip();
  }, [id]);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-300 dark:border-gray-700 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              {/* Title */}
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {title}
                </h1>

                {/* ✅ Render multiple images */}
                {tipImages.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tipImages.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`tip-image-${index}`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2 text-gray-800 dark:text-white">
                  Description:
                </p>
                <p className="text-gray-700 dark:text-gray-300">{description}</p>
              </div>

              {/* Category */}
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2 text-gray-800 dark:text-white">
                  Category:
                </p>
                <p className="text-gray-700 dark:text-gray-300">{category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTip;
