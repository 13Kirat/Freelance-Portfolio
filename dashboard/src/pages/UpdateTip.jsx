import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllTipErrors,
  getAllTips,
  resetTipSlice,
  updateTip,
} from "@/store/slices/tipSlice";
import { Button } from "@/components/ui/button";

const UpdateTip = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tipImage, setTipImage] = useState("");
  const [tipImagePreview, setTipImagePreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.tip);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleTipImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTipImagePreview(reader.result);
      setTipImage(file);
    };
  };

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
          setTipImage(
            res.data.tip.tipImage && res.data.tip.tipImage.url
          );
          setTipImagePreview(
            res.data.tip.tipImage && res.data.tip.tipImage.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getTip();

    if (error) {
      toast.error(error);
      dispatch(clearAllTipErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTipSlice());
      dispatch(getAllTips());
    }
  }, [id, message, error]);

  const handleUpdateTip = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (tipImage) {
      formData.append("tipImage", tipImage);
    }
    dispatch(updateTip(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <form
          onSubmit={handleUpdateTip}
          className="w-[100%] px-5 md:w-[1000px] pb-5"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
                <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                  UPDATE TIP
                </h2>
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <img
                    src={
                      tipImagePreview
                        ? tipImagePreview
                        : "/avatarHolder.jpg"
                    }
                    alt="tipImage"
                    className="w-full h-auto"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleTipImage}
                      className="avatar-update-btn mt-4 w-full"
                    />
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tip Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Tip Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        placeholder="Tip Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Tip Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {loading ? (
              <SpecialLoadingButton content={"Updating"} width={"w-52"} />
            ) : (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateTip;
