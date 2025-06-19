import React from "react";

import { ProfileTypeDescription } from "../../types/Profile";

import { useAuth } from "../../auth/AuthContext";
import { FlexDivider } from "../../components/FlexDivider";

import AvatarSvg from "jsx:../../svg/avatar.svg";

export function ProfilePage({ }: {}) {
    const auth = useAuth();
    const profile = auth.profile;

    if (profile === undefined) {
        return (
            <>
            </>
        );
    }

    return (
        <>
            <div className="profile-header-container">
                <div className="profile-photo-name-container">
                    <div className="profile-photo-container">
                        <AvatarSvg />
                    </div>
                    <h3>{profile.firstName}</h3>
                    <h5>{ProfileTypeDescription[profile.type]}</h5>
                </div>
                <div className="profile-quick-info-container">
                    <div className="profile-quick-info">
                        <h3>{profile.group}</h3>
                        <h6>Группа</h6>
                    </div>
                    <FlexDivider />
                    <div className="profile-quick-info">
                        <h3>{profile.averageScore}</h3>
                        <h6>Средняя оценка</h6>
                    </div>
                    <FlexDivider />
                    <div className="profile-quick-info">
                        <button className="profile-settings-button">Настройки</button>
                    </div>
                </div>
            </div>
            {
                profile.averageScores.length > 0 &&
                <div className="profile-average-scores-container">
                    {profile.averageScores.map((score) => {
                        return (
                            <div key={score.lesson} className="profive-average-score-container">
                                <span className={"score " + score.score}>{score.score}</span>
                                <h4>{score.lesson}</h4>
                            </div>
                        )
                    })}
                </div>
            }
            <div className="profile-last-scores-container">
                {
                    profile.lastScores.map((score, i) => {
                        return (
                            <div key={`${score.lesson}-${i}`} className="profile-last-score-container">
                                <h4>{score.lesson}</h4>
                                <span className={"score " + score.score}>{score.score}</span>
                            </div>
                        )
                    })
                }
            </div>
            {
                (profile.averageScores.length === 0 && profile.lastScores.length === 0) &&
                <h6 style={{ textAlign: "center" }}>Здесь будут оценки</h6>
            }
        </>
    );
}