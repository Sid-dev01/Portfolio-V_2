import type { Express } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(app: Express): Promise<void> {
  // Seed data on startup
  await storage.seedData();

  // Portfolio data endpoints
  app.get(api.jobs.list.path, async (_req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  });

  app.get(api.projects.list.path, async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get(api.skills.list.path, async (_req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  // GitHub contributions endpoint
  app.get('/api/github-contributions', async (_req, res) => {
    try {
      const githubToken = process.env.GITHUB_TOKEN;
      const githubUsername = process.env.GITHUB_USERNAME || 'Sid-dev01';

      if (!githubToken) {
        return res.status(200).json({
          error: 'GitHub token not configured',
          message: 'Add GITHUB_TOKEN to your .env file',
          contributions: null,
        });
      }

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query($username: String!) {
              user(login: $username) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                        color
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            username: githubUsername,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        return res.status(200).json({
          error: 'GitHub API error',
          message: data.errors[0]?.message || 'Failed to fetch contributions',
          contributions: null,
        });
      }

      res.json({
        contributions: data.data?.user?.contributionsCollection?.contributionCalendar,
      });
    } catch (error: any) {
      res.status(200).json({
        error: 'Failed to fetch GitHub contributions',
        message: error.message,
        contributions: null,
      });
    }
  });
}
