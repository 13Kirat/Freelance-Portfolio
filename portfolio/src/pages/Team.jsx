import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeamMembers } from "../store/slices/teamSlice";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "react-hot-toast";

const Team = () => {
  const dispatch = useDispatch();
  const { team, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getAllTeamMembers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">Our Team</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card key={member._id} className="overflow-hidden shadow-lg">
              <img
                src={member.image.url}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{member.email}</p>
                <p className="text-base">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
