import { gitHubClient } from "../../common/api/githubAPI";
import { Card } from "../../common/components";
import { useEffect, useState } from "react";

interface RepoCardProps {
  owner: string;
  repo: string;
  onClick?: () => void;
}

export function RepoCard({ owner, repo, onClick }: RepoCardProps) {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<{ description: string, full_name: string } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      setError(false)
      setLoading(true)
      try {
        setData(await gitHubClient.repo(owner, repo))
      } catch (e) {
        setData(null)
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [owner, repo])

  return (
    <div>
      {error ?
        (<div className="error" style={{ width: '100%', height: '100%' }}>
          <span>An error occurred while retrieving the {repo} repo</span>
        </div>
        ) :
        <Card
          onClick={onClick}
          description={isLoading ? "Loading..." : data?.description || ""}
          title={isLoading ? "Loading..." : data?.full_name || ""}
        />}
    </div>
  );
}
