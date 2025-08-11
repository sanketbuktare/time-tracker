import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { Project, Task } from "../types";
import TaskRow from "../components/TaskRow";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await api.get<Project>(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error("fetchProject", err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !id) return;
    try {
      await api.post("/tasks", { title: newTaskTitle.trim(), projectId: id });
      setNewTaskTitle("");
      await fetchProject(); // prop drilling: page-level refresh passed down via props if needed
    } catch (err) {
      console.error("add task", err);
      alert("Failed to add task");
    }
  };

  if (!id) return <div className="text-center text-red-500 py-8">Invalid project id</div>;
  if (loading) return <div className="text-center text-gray-500 py-8">Loading project...</div>;
  if (!project) return <div className="text-center text-red-500 py-8">Project not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">{project.name}</h2>
        {project.description && (
          <p className="text-gray-600 mb-4">{project.description}</p>
        )}
        <div className="flex items-center gap-4 mt-2">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            {project.Tasks?.length ?? 0} Task{(project.Tasks?.length ?? 0) !== 1 ? 's' : ''}
          </span>
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Add New Task</h3>
        <form onSubmit={handleAddTask} className="flex gap-2 items-center bg-white p-4 rounded-lg shadow border border-gray-100">
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New work/task title"
            className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Add
          </button>
        </form>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Tasks</h3>
        <div className="space-y-3">
          {project.Tasks && project.Tasks.length > 0 ? (
            project.Tasks.map((t: Task) => (
              <TaskRow key={t.id} task={t} onSessionChange={fetchProject} />
            ))
          ) : (
            <div className="text-gray-400 text-center py-8 bg-white rounded shadow border border-gray-100">
              No tasks yet. Add one to start tracking time.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
