
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTips } from "../store/slices/tipSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TipModal from "./miniComponents/TipModal";

const Tips = () => {
  const dispatch = useDispatch();
  const { tips, loading } = useSelector((state) => state.tip);
  const [category, setCategory] = useState("All");
  const [selectedTip, setSelectedTip] = useState(null);

  useEffect(() => {
    dispatch(getAllTips());
  }, [dispatch]);

  const categories = ["All", ...new Set(tips.map((tip) => tip.category))];

  const filteredTips = category === "All" ? tips : tips.filter((tip) => tip.category === category);

  const openModal = (tip) => {
    setSelectedTip(tip);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 70) {
      return words.slice(0, 70).join(" ") + "...";
    }
    return description;
  };

  const closeModal = () => {
    setSelectedTip(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Developer Tips</h1>
      <div className="flex justify-center mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
            className="mr-2"
          >
            {cat}
          </Button>
        ))}
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTips.map((tip) => (
            <Card key={tip._id} onClick={() => openModal(tip)} className="cursor-pointer">
              {tip.images && tip.images[0] && (
                <img
                  src={tip.images[0].url}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tip.category}</p>
                <p className="mt-4">{truncateDescription(tip.description)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {selectedTip && <TipModal tip={selectedTip} onClose={closeModal} />}
    </div>
  );
};

export default Tips;

