import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://freelance-portfolio-production-8f14.up.railway.app/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const statuses = ["All", ...new Set(projects.map((project) => project.status))];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = category === "All" || project.category === category;
    const statusMatch = status === "All" || project.status === status;
    return categoryMatch && statusMatch;
  });

  return (
    <div id="projects">
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PROJECTS
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="flex justify-center mb-8 gap-4">
        <div>
          <label className="mr-2">Category:</label>
          <Select onValueChange={setCategory} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mr-2">Status:</label>
          <Select onValueChange={setStatus} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((stat) => (
                <SelectItem key={stat} value={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {viewAll
          ? filteredProjects &&
          filteredProjects.map((element) => {
            return (
              <Link to={`/project/${element?._id}`} key={element?._id}>
                <img
                  src={element?.projectBanner && element?.projectBanner.url}
                  alt={element?.title}
                />
              </Link>
            );
          })
          : filteredProjects &&
          filteredProjects.slice(0, 9).map((element) => {
            return (
              <Link to={`/project/${element?._id}`} key={element?._id}>
                <img
                  src={element?.projectBanner && element?.projectBanner.url}
                  alt={element?.title}
                />
              </Link>
            );
          })}
      </div>
      {filteredProjects && filteredProjects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
