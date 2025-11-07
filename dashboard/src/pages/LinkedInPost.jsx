
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { postToLinkedIn } from "../../store/slices/linkedinSlice";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const LinkedInPost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.linkedIn);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!caption || !image) {
      return toast({
        title: "Error",
        description: "Please provide a caption and an image.",
        variant: "destructive",
      });
    }
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    dispatch(postToLinkedIn(formData));
  };

  return (
    <div className="container mx-auto p-4 sm:pl-20">
      <h1 className="text-2xl font-bold mb-4">Post to LinkedIn</h1>
      <div className="space-y-4">
        <div>
          <Textarea
            placeholder="What do you want to talk about?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" className="mt-2 h-40" />
          </div>
        )}
        <div>
          {loading ? (
            <SpecialLoadingButton content={"Posting..."} />
          ) : (
            <Button onClick={handlePost}>Post to LinkedIn</Button>
          )}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {message && <div className="text-green-500">{message}</div>}
      </div>
    </div>
  );
};

export default LinkedInPost;
