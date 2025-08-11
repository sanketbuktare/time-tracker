import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Project } from "../types";
import ProjectList from "../components/ProjectList";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get<Project[]>("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("fetchProjects", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectDeleted = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => nav("/projects/new")}
          className="px-3 py-2 bg-blue-600 text-white rounded-md"
        >
          Create Project
        </button>
      </div>

      {loading ? (
        <div>Loading projects...</div>
      ) : (
        <ProjectList
          projects={projects}
          onRefresh={fetchProjects}
          onProjectDeleted={handleProjectDeleted}
        />
      )}
    </div>
  );
}
