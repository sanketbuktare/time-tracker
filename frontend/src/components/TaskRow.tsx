import React, { useEffect, useState } from "react";
import type { Task, WorkSession } from "../types";
import api from "../services/api";
import Timer from "./Timer";

type Props = {
  task: Task;
  onSessionChange?: () => void;
};

export default function TaskRow({ task, onSessionChange }: Props) {
  const [runningSession, setRunningSession] = useState<WorkSession | null>(
    null
  );
  const [elapsed, setElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessions(); /* eslint-disable-next-line */
  }, [task.id]);

  const fetchSessions = async () => {
    try {
      const res = await api.get<WorkSession[]>(`/work/task/${task.id}`);
      const sessions = res.data || [];
      const last = sessions.length ? sessions[sessions.length - 1] : null;
      setRunningSession(last);
      if (last && !last.stoppedAt) {
        setIsRunning(true);
        const started = new Date(last.startedAt).getTime();
        setElapsed(Math.floor((Date.now() - started) / 1000));
      } else if (last) {
        setIsRunning(false);
        setElapsed(last.durationSeconds ?? 0);
      } else {
        setIsRunning(false);
        setElapsed(0);
      }
    } catch (err) {
      console.error("fetchSessions", err);
    }
  };

  const handleStart = async () => {
    try {
      setLoading(true);
      const res = await api.post("/work/start", { taskId: task.id });
      setRunningSession(res.data);
      setIsRunning(true);
      setElapsed(0);
      onSessionChange?.();
    } catch (err) {
      console.error("start", err);
      alert("Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    if (!runningSession) return;
    try {
      setLoading(true);
      const res = await api.post("/work/stop", {
        workSessionId: runningSession.id,
      });
      setRunningSession(res.data);
      setIsRunning(false);
      setElapsed(res.data.durationSeconds ?? 0);
      onSessionChange?.();
    } catch (err) {
      console.error("stop", err);
      alert("Failed to stop session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
      <div>
        <div className="font-medium">{task.title}</div>
        <div className="text-sm text-gray-500">Status: {task.status}</div>
      </div>

      <div className="flex items-center gap-4">
        <Timer
          running={isRunning}
          initialSeconds={elapsed}
          onTick={(s) => setElapsed(s)}
        />
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={loading}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            disabled={loading}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
