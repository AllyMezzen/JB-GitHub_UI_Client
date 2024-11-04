import { gitHubClient } from "../../common/api/githubAPI";
import "./index.css";
import { useEffect, useState } from "react";
import { IssueComment } from "../../common/githubTypes";

interface IssueCommentsProps {
    owner: string;
    repo: string;
    issueId: number;
}

export function IssueComments({ owner, repo, issueId }: IssueCommentsProps) {
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState<IssueComment[] | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            setError(false)
            try {
                const comments = await gitHubClient.comments(owner, repo, issueId)
                setData(comments)
            } catch (e) {
                setData(null)
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [issueId, owner, repo])

    const getReactions = (comment: IssueComment) => {
        if (comment.reactions == undefined) return
        if (comment.reactions.total_count == 0) return
        console.log(comment.reactions)
        let result: { symbol: string, count: number }[] = []
        if (comment.reactions?.["+1"] > 0) {
            result.push({
                symbol: "✅",
                count: comment.reactions?.["+1"]
            })
        }
        if (comment.reactions?.["-1"] > 0) {
            result.push({
                symbol: "❌",
                count: comment.reactions?.["-1"]
            })

        }
        if (comment.reactions?.laugh > 0) {
            result.push({
                symbol: "😂",
                count: comment.reactions?.laugh
            })

        }
        if (comment.reactions?.confused > 0) {
            result.push({
                symbol: "😕",
                count: comment.reactions?.confused
            })

        }
        if (comment.reactions?.heart > 0) {
            result.push({
                symbol: "❤️",
                count: comment.reactions?.heart
            })

        }
        if (comment.reactions?.hooray > 0) {
            result.push({
                symbol: "🎉",
                count: comment.reactions?.hooray
            })

        }
        if (comment.reactions?.eyes > 0) {
            result.push({
                symbol: "👀",
                count: comment.reactions?.eyes
            })

        }
        if (comment.reactions?.rocket > 0) {
            result.push({
                symbol: "🚀",
                count: comment.reactions?.rocket
            })
        }
        return result
    }

    return (
        <div className="information-block-right">
            <h2>Comments</h2>
            <div className={"comments-section " + (isLoading ? "comments-load" : "")}>
                {error &&
                    (<div className="error">
                        <span>An error occurred while retrieving the comments</span>
                    </div>
                    )}
                {!isLoading && data && !data.length && "No comments found"}
                {isLoading
                    ? "Loading..."
                    : data?.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div className="comment-header">
                                <img
                                    src={comment.user?.avatar_url}
                                    alt={comment.user?.login}
                                    className="avatar"
                                />
                                <div className="comment-meta">
                                    <span className="author">{comment.user?.login}</span>
                                    <span className="timestamp">
                                        {" "}
                                        commented {comment.created_at}
                                    </span>
                                </div>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: comment.body_html ? comment.body_html : '',
                                }}
                                className="comment-body"
                            />
                            <div className="reaction-list">
                                {getReactions(comment)?.map((item, index) => {
                                    return <div className="reaction-icon" key={index}>{item.symbol + " " + item.count}</div>
                                })}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
