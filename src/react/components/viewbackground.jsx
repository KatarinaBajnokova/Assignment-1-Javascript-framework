import React from "react";
import "../../sass/main.scss";

function App() {
  return (
    <div className="video-background">
      <video
        className="video-background__video"
        src="public/video/view.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

export default App;
