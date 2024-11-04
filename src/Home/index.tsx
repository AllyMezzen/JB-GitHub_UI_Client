import { useState } from "react";
import "./index.css";
import "./media.css";
import { RepoCard } from "./RepoCard";
import { IssueBoard } from "./IssueBoard";
import { IssueComments } from "./IssueComments";
import "../common/styles/global.css"

export function Home() {
    const [selectedRepository, setSelectedRepository] = useState<null | {
        owner: string;
        repo: string;
    }>(null);
    const [selectedIssue, setSelectedIssue] = useState<null | number>(null);

    const handleCardClick = (params: { owner: string; repo: string }) => () => {
        setSelectedRepository(params);
        setSelectedIssue(null);
    };

    const handleIssueClick = (issueId: number) => {
        setSelectedIssue(issueId);
    };

    return (
        <div className="homepage">
            <header className="header">
                <div className="header-container">
                    <div className="header-heading">
                        <h2>GitHub UI-Client</h2>
                </div>
                </div>
            </header>

            <main className="main">
                <div className="home-section">
                    <h1>Interesting Repositories</h1>
                    <div className="grid-container">
                        <RepoCard
                            onClick={handleCardClick({ owner: "vercel", repo: "next.js" })}
                            owner="vercel"
                            repo="next.js"
                        />
                        <RepoCard
                            onClick={handleCardClick({ owner: "vitejs", repo: "vite" })}
                            owner="vitejs"
                            repo="vite"
                        />
                        <RepoCard
                            onClick={handleCardClick({ owner: "facebook", repo: "react" })}
                            owner="facebook"
                            repo="react"
                        />
                    </div>

                    <div className="information-block">
                        {selectedRepository && (
                            <IssueBoard
                                owner={selectedRepository.owner}
                                repo={selectedRepository.repo}
                                onIssueClick={handleIssueClick}
                            />
                        )}

                        {selectedIssue && selectedRepository && (
                            <IssueComments
                                owner={selectedRepository.owner}
                                repo={selectedRepository.repo}
                                issueId={selectedIssue}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
