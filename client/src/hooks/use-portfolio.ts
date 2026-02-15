import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// ============================================
// Portfolio Data Hooks
// ============================================

export function useJobs() {
  return useQuery({
    queryKey: [api.jobs.list.path],
    queryFn: async () => {
      const res = await fetch(api.jobs.list.path);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return api.jobs.list.responses[200].parse(await res.json());
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// GitHub Stats Hook
// ============================================

interface GitHubContribution {
  contributionCount: number;
  date: string;
  color: string;
}

interface GitHubWeek {
  contributionDays: GitHubContribution[];
}

interface GitHubCalendar {
  totalContributions: number;
  weeks: GitHubWeek[];
}

interface GitHubResponse {
  contributions: GitHubCalendar | null;
  error?: string;
  message?: string;
}

export function useGitHubContributions() {
  return useQuery<GitHubResponse>({
    queryKey: ["/api/github-contributions"],
    queryFn: async () => {
      const res = await fetch("/api/github-contributions");
      if (!res.ok) throw new Error("Failed to fetch GitHub contributions");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: 1,
  });
}
