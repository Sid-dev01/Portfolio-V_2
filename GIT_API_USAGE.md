# GitHub API Integration Guide

This portfolio currently uses a placeholder component for the GitHub contribution graph. 
To display real data, follow these steps:

## 1. Choose a Data Source
You have two main options to fetch your contribution data:

### Option A: GitHub GraphQL API (Recommended for flexibility)
- **Endpoint**: `https://api.github.com/graphql`
- **Requires**: A GitHub Personal Access Token (PAT).
- **Setup**:
  1. Generate a PAT from GitHub Settings > Developer Settings > Personal access tokens.
  2. Use the `viewer` query to fetch `contributionsCollection`.
  3. **Important**: Do NOT expose your PAT in the frontend code. You should create a proxy endpoint in `server/routes.ts` that holds the token in an environment variable (`GITHUB_TOKEN`).

### Option B: Third-party Service (Easier)
- Services like `ghchart.rshah.io` or similar can generate an image or JSON for you without needing your own backend token management for public data.

## 2. Implementation Steps (Option A)

1. **Backend (`server/routes.ts`)**:
   Add a new route to proxy the request:
   ```typescript
   app.get('/api/github-stats', async (req, res) => {
     const response = await fetch('https://api.github.com/graphql', {
       method: 'POST',
       headers: {
         Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
       },
       body: JSON.stringify({
         query: `
           query {
             user(login: "Sid-dev01") {
               contributionsCollection {
                 contributionCalendar {
                   totalContributions
                   weeks {
                     contributionDays {
                       contributionCount
                       date
                     }
                   }
                 }
               }
             }
           }
         `
       })
     });
     const data = await response.json();
     res.json(data);
   });
   ```

2. **Frontend (`client/src/components/GitStats.tsx`)**:
   - Update the component to fetch from `/api/github-stats` using `useQuery`.
   - Map the `weeks` and `contributionDays` to the grid squares.
   - Color code the squares based on `contributionCount` (e.g., 0=gray, 1-3=light green, etc.).

## 3. Environment Variables
- Add `GITHUB_TOKEN` to your project's Secrets/Environment Variables.
