import { Issue, IssueComment } from "../githubTypes";

const gitHubRequest = async <T extends any>(url: string) => {
  const headers : HeadersInit= {
    Accept: "application/vnd.github.html+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  
  if (process.env.REACT_APP_GITHUB_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`;
  }
  
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  })
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>
}

export const gitHubClient = {
  repo: (owner: string, repo: string) =>
    gitHubRequest<{ description: string; full_name: string }>(
      `https://api.github.com/repos/${owner}/${repo}`
    ),
  issues: (owner: string, repo: string) =>
    gitHubRequest<Issue[]>(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    ),
  comments: (owner: string, repo: string, issueId: number) =>
    gitHubRequest<IssueComment[]>(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}/comments`
    ),
};
