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
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [existingCategories, setExistingCategories] = useState([]); // ✅ new

  const { error, message, loading, tips } = useSelector((state) => state.tip);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigateTo = useNavigate();

  // ✅ Extract unique categories from all tips
  useEffect(() => {
    if (tips && tips.length > 0) {
      const categories = Array.from(new Set(tips.map((tip) => tip.category))).filter(Boolean);
      setExistingCategories(categories);
    }
  }, [tips]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
    const previews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(previews).then((results) => {
      setImagesPreview((prevPreviews) => [...prevPreviews, ...results]);
    });
  };

  const removeImage = (index, isExisting) => {
    if (isExisting) {
      const deletedImage = existingImages[index];
      setDeletedImages((prevDeleted) => [
        ...prevDeleted,
        deletedImage.public_id,
      ]);
      setExistingImages((prevExisting) =>
        prevExisting.filter((_, i) => i !== index)
      );
    } else {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setImagesPreview((prevPreviews) =>
        prevPreviews.filter((_, i) => i !== index)
      );
    }
  };

  useEffect(() => {
    const getTip = async () => {
      try {
        const res = await axios.get(
          `https://freelance-portfolio-production-8f14.up.railway.app/api/v1/tip/get/${id}`,
          { withCredentials: true }
        );
        const tip = res.data.tip;
        setTitle(tip.title);
        setDescription(tip.description);
        setCategory(tip.category);
        setExistingImages(tip.images || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load tip");
      }
    };
    getTip();
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTipErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTipSlice());
      dispatch(getAllTips());
      navigateTo("/");
    }
  }, [message, error, dispatch]);

  const handleUpdateTip = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    deletedImages.forEach((public_id) =>
      formData.append("deletedImages", public_id)
    );
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateTip(id, formData));
  };

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
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
              {/* ---- Images Section ---- */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Images
                </label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`existing-tip-${index}`}
                        className="w-32 h-32 object-cover"
                      />
                      <Button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => removeImage(index, true)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                  {imagesPreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`new-tip-${index}`}
                        className="w-32 h-32 object-cover"
                      />
                      <Button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => removeImage(index, false)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="relative mt-4">
                  <input
                    type="file"
                    onChange={handleImage}
                    multiple
                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>

              {/* ---- Title ---- */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Tip Title
                </label>
                <input
                  type="text"
                  placeholder="Tip Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* ---- Description ---- */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <Textarea
                  placeholder="Tip Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* ---- Category ---- */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>

                {/* Existing Categories Dropdown */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select existing category</option>
                  {existingCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* OR Add New Category */}
                <input
                  type="text"
                  placeholder="Or enter a new category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
  );
};

export default UpdateTip;
