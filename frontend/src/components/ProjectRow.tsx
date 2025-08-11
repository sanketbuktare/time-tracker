import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import api from "../services/api";

type Props = {
  project: Project;
  onRefresh?: () => void;
  onDeleted?: (id: string) => void;
};

export default function ProjectRow({ project, onRefresh, onDeleted }: Props) {
  const nav = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this project?")) return;
    try {
      setDeleting(true);
      await api.delete(`/projects/${project.id}`);
      onDeleted?.(project.id);
      onRefresh?.();
    } catch (err) {
      console.error("delete project", err);
      alert("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      onClick={() => nav(`/projects/${project.id}`)}
      className="p-4 bg-white rounded shadow hover:shadow-md cursor-pointer"
    >
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{project.name}</div>
          <div className="text-sm text-gray-500">{project.description}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            {project.Tasks?.length ?? 0} tasks
          </div>
          <button
            onClick={handleDelete}
            className="mt-2 text-xs text-red-600"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
