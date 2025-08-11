
import type { Project } from "../types";
import ProjectRow from "./ProjectRow";

type Props = {
  projects: Project[];
  onRefresh?: () => void;
  onProjectDeleted?: (id: string) => void;
};

export default function ProjectList({
  projects,
  onRefresh,
  onProjectDeleted,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.length === 0 ? (
        <div className="text-gray-500">No projects</div>
      ) : (
        projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            onDeleted={onProjectDeleted}
            onRefresh={onRefresh}
          />
        ))
      )}
    </div>
  );
}
