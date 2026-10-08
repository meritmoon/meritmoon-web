import React from "react";

export const AmbientMesh: React.FC = () => {
  return (
    <>
      <div className="moonlight-wash" aria-hidden="true" />
      <div className="ambient-mesh" aria-hidden="true">
        <div className="ambient-orb ambient-orb--emerald1" />
        <div className="ambient-orb ambient-orb--gold1" />
        <div className="ambient-orb ambient-orb--silver1" />
        <div className="ambient-orb ambient-orb--emerald2" />
        <div className="ambient-orb ambient-orb--ruby1" />
      </div>
    </>
  );
};

export default AmbientMesh;
