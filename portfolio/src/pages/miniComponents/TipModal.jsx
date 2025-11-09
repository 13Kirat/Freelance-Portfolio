import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TipModal = ({ tip, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <Card className="bg-[#111] text-white rounded-2xl overflow-hidden w-11/12 md:w-1/2 lg:w-1/3 shadow-2xl border border-gray-700">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700 pb-3">
          <CardTitle className="text-lg font-semibold">{tip.title}</CardTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-full"
          >
            ✕
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="pt-4">
          <p className="text-sm text-gray-400">{tip.category}</p>
          <p className="mt-3 text-gray-200 leading-relaxed">{tip.description}</p>
          {/* Images */}
          {tip.images && tip.images.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {tip.images.map((image, index) => (<>
                <div className="font-semibold text-lg">Image {index + 1}.</div>

                <img
                  key={image.public_id}
                  src={image.url}
                  alt={tip.title}
                  className="w-full h-32 object-cover rounded-lg border border-gray-700"
                />
              </>
              ))}
            </div>
          )}

          {/* Close Button (bottom for mobile comfort) */}
          <div className="mt-6 flex justify-end">
            <Button
              onClick={onClose}
              className="bg-white text-black hover:bg-gray-200 font-semibold px-5 py-2 rounded-md"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipModal;
