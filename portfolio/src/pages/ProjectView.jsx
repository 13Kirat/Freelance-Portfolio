import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `https://freelance-portfolio-production-8f14.up.railway.app/api/v1/project/get/${id}`,
          { withCredentials: true }
        );

        const p = res.data.project;
        setTitle(p.title);
        setDescription(p.description);
        setStack(p.stack);
        setDeployed(p.deployed);
        setTechnologies(p.technologies);
        setGitRepoLink(p.gitRepoLink);
        setProjectLink(p.projectLink);
        setProjectBannerPreview(p.projectBanner?.url || "");
        setCategory(p.category);
        setStatus(p.status);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      }
    };
    getProject();
  }, [id]);

  const descriptionList = description?.split(". ") || [];
  const technologiesList = technologies?.split(", ") || [];

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4 bg-gray-50">
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex justify-between items-center border-b pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800">{title}</CardTitle>
          <Button onClick={() => navigate("/")}>Return to Portfolio</Button>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Project Banner */}
          <div>
            <img
              src={projectBannerPreview || "/avatarHolder.jpg"}
              alt="Project Banner"
              className="w-full rounded-xl shadow-md object-cover max-h-[400px]"
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Description</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Technologies</h2>
            <ul className="flex flex-wrap gap-2">
              {technologiesList.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </ul>
          </div>

          {/* Details Table */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Project Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                  {stack && <tr className="border-b">
                    <td className="p-3 font-semibold text-gray-600 w-1/3">Stack</td>
                    <td className="p-3 text-gray-800">{stack}</td>
                  </tr>}
                  {deployed && <tr className="border-b">
                    <td className="p-3 font-semibold text-gray-600">Deployment Type</td>
                    <td className="p-3 text-gray-800">{deployed}</td>
                  </tr>}
                  {category && <tr className="border-b">
                    <td className="p-3 font-semibold text-gray-600">Category</td>
                    <td className="p-3 text-gray-800">{category}</td>
                  </tr>}
                  {status && <tr className="border-b">
                    <td className="p-3 font-semibold text-gray-600">Status</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-sm font-medium ${status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>}
                  {gitRepoLink && <tr className="border-b">
                    <td className="p-3 font-semibold text-gray-600">GitHub Repository</td>
                    <td className="p-3">
                      <Link
                        to={gitRepoLink}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {gitRepoLink || "—"}
                      </Link>
                    </td>
                  </tr>}
                  {projectLink && <tr>
                    <td className="p-3 font-semibold text-gray-600">Project Link</td>
                    <td className="p-3">
                      <Link
                        to={projectLink}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {projectLink || "—"}
                      </Link>
                    </td>
                  </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectView;
