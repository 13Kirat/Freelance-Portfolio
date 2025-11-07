
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TipModal = ({ tip, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white rounded-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{tip.title}</CardTitle>
          <Button variant="ghost" onClick={onClose}>X</Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{tip.category}</p>
          <p className="mt-4">{tip.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {tip.images &&
              tip.images.map((image) => (
                <img
                  key={image.public_id}
                  src={image.url}
                  alt={tip.title}
                  className="w-full h-auto object-cover rounded-md"
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipModal;
