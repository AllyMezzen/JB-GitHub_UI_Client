import { gitHubClient } from "../../common/api/githubAPI";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./index.css";
import "./media.css";
import { useEffect, useState } from "react";
import { Issue } from "../../common/githubTypes";

interface IssueBoardProps {
    owner: string;
    repo: string;
    onIssueClick: (id: number) => void;
}

export function IssueBoard({ owner, repo, onIssueClick }: IssueBoardProps) {
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState<Issue[] | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            setError(false)
            try {
                setData(await gitHubClient.issues(owner, repo))
            } catch (e) {
                setData(null)
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [owner, repo])

    return (
        <div className="information-block-left">
            <h2>Issues</h2>
            {isLoading ? (
                "Loading..."
            ) : (
                <div className="issues-list">
                    {error &&
                        (<div className="error">
                            <span>An error occurred while retrieving the issues</span>
                        </div>
                        )}
                    {data && data?.map((issue) => (
                        <div
                            className="issue"
                            key={issue.id}
                            onClick={() => onIssueClick(issue.number)}
                        >
                            <div className="issue-icon">
                                {issue.state === "open" ? (
                                    <FaExclamationCircle className="open-icon" />
                                ) : (
                                    <FaCheckCircle className="closed-icon" />
                                )}
                            </div>
                            <div className="issue-content">
                                <div className="issue-title">
                                    {issue.title}
                                    <div className="issue-labels">
                                        {issue.labels.map((label, index) => (
                                            <span
                                                key={index}
                                                className="label"
                                            >
                                                {label.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="issue-meta">
                                    #{issue.id} opened {issue.created_at} by {issue.user?.login}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
