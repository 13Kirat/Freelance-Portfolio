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
    <div className="relative flex justify-center items-center min-h-screen py-10 px-6 bg-[#0e0e10] text-gray-100">
      {/* Fixed Top-Right Button */}
      <div className="absolute top-6 right-6">
        <Button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg shadow-md transition-all"
        >
          Return to Portfolio
        </Button>
      </div>

      <Card className="w-full max-w-5xl bg-[#18181b] border border-gray-800 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-700 pb-4">
          <CardTitle className="text-3xl font-bold text-white tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Project Banner */}
          <div>
            <img
              src={projectBannerPreview || "/avatarHolder.jpg"}
              alt="Project Banner"
              className="w-full rounded-xl shadow-lg object-cover max-h-[400px] border border-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-indigo-400">
              Description
            </h2>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-indigo-400">
              Technologies
            </h2>
            <ul className="flex flex-wrap gap-2">
              {technologiesList.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-900/40 text-indigo-300 rounded-full text-sm font-medium border border-indigo-700/60"
                >
                  {tech}
                </span>
              ))}
            </ul>
          </div>

          {/* Details Table */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
              Project Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                <tbody>
                  {stack && (
                    <tr className="border-b border-gray-700 hover:bg-[#1f1f23]">
                      <td className="p-3 font-semibold text-gray-400 w-1/3">
                        Stack
                      </td>
                      <td className="p-3 text-gray-200">{stack}</td>
                    </tr>
                  )}
                  {/* {deployed && (
                    <tr className="border-b border-gray-700 hover:bg-[#1f1f23]">
                      <td className="p-3 font-semibold text-gray-400">
                        Deployment Type
                      </td>
                      <td className="p-3 text-gray-200">{deployed}</td>
                    </tr>
                  )} */}
                  {category && (
                    <tr className="border-b border-gray-700 hover:bg-[#1f1f23]">
                      <td className="p-3 font-semibold text-gray-400">
                        Category
                      </td>
                      <td className="p-3 text-gray-200">{category}</td>
                    </tr>
                  )}
                  {status && (
                    <tr className="border-b border-gray-700 hover:bg-[#1f1f23]">
                      <td className="p-3 font-semibold text-gray-400">Status</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-md text-sm font-medium ${
                            status.toLowerCase() === "completed"
                              ? "bg-green-900/40 text-green-300 border border-green-800/60"
                              : "bg-yellow-900/40 text-yellow-300 border border-yellow-800/60"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  )}
                  {gitRepoLink && (
                    <tr className="border-b border-gray-700 hover:bg-[#1f1f23]">
                      <td className="p-3 font-semibold text-gray-400">
                        GitHub Repository
                      </td>
                      <td className="p-3">
                        <Link
                          to={gitRepoLink}
                          target="_blank"
                          className="text-indigo-400 hover:underline hover:text-indigo-300 transition-colors"
                        >
                          {gitRepoLink || "—"}
                        </Link>
                      </td>
                    </tr>
                  )}
                  {projectLink && (
                    <tr className="hover:bg-[#1f1f23]">
                      <td className="p-3 font-semibold text-gray-400">
                        Project Link
                      </td>
                      <td className="p-3">
                        <Link
                          to={projectLink}
                          target="_blank"
                          className="text-indigo-400 hover:underline hover:text-indigo-300 transition-colors"
                        >
                          {projectLink || "—"}
                        </Link>
                      </td>
                    </tr>
                  )}
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
