import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  resetTeamSlice,
  updateTeamMember,
} from "../store/slices/teamSlice";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const ManageTeam = () => {
  const dispatch = useDispatch();
  const { team, loading, error, message } = useSelector((state) => state.team);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateImage, setUpdateImage] = useState(null);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetTeamSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTeamSlice());
      dispatch(getAllTeamMembers());
    }
  }, [dispatch, error, message]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateImageChange = (e) => {
    setUpdateImage(e.target.files[0]);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("image", image);
    dispatch(addTeamMember(formData));
  };

  const handleDeleteMember = (id) => {
    dispatch(deleteTeamMember(id));
  };

  const handleUpdateMember = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (updateName) formData.append("name", updateName);
    if (updateEmail) formData.append("email", updateEmail);
    if (updateDescription) formData.append("description", updateDescription);
    if (updateImage) formData.append("image", updateImage);
    dispatch(updateTeamMember(memberId, formData));
  };

  const openUpdateModal = (member) => {
    setMemberId(member._id);
    setUpdateName(member.name);
    setUpdateEmail(member.email);
    setUpdateDescription(member.description);
  };

  useEffect(() => {
    dispatch(getAllTeamMembers());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Team</h1>
      <Card className="mb-4">
        <CardContent>
          <form onSubmit={handleAddMember} className="space-y-4 mt-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input type="file" onChange={handleImageChange} />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Team Member"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <Card key={member._id}>
            <CardContent className="p-4">
              <img
                src={member.image.url}
                alt={member.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.email}</p>
              <p className="mt-2">{member.description}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => openUpdateModal(member)}
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Team Member</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleUpdateMember}
                      className="space-y-4 mt-4"
                    >
                      <Input
                        placeholder="Name"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}
                      />
                      <Input
                        placeholder="Email"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                      />
                      <Textarea
                        placeholder="Description"
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                      />
                      <Input type="file" onChange={handleUpdateImageChange} />
                      <Button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteMember(member._id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageTeam;
