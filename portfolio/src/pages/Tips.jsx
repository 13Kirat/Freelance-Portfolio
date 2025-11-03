import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTips } from "../store/slices/tipSlice"; // This will fail until the store is set up
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Tips = () => {
  const dispatch = useDispatch();
  const { tips, loading } = useSelector((state) => state.tip); // This will fail until the store is set up
  const [category, setCategory] = useState("All");

  useEffect(() => {
    dispatch(getAllTips());
  }, [dispatch]);

  const categories = ["All", ...new Set(tips.map((tip) => tip.category))];

  const filteredTips = category === "All" ? tips : tips.filter((tip) => tip.category === category);

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
            <Card key={tip._id}>
              {tip.tipImage && tip.tipImage.url && (
                <img
                  src={tip.tipImage.url}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tip.category}</p>
                <p className="mt-4">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tips;
