// Displays a pulsating circle animation to indicate voice recording activity.
// The scale changes based on simulated volume input.

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function RecordingIndicator({ isRecording, volume }) {
  const controls = useAnimation();

  useEffect(() => {
    if (isRecording) {
      controls.start({
        scale: [1, 1 + volume],
        transition: {
          duration: 0.9,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        },
      });
    } else {
      controls.stop();
    }
  }, [isRecording, volume, controls]);

  return (
    <motion.div
      animate={controls}
      className="absolute w-10 h-10 rounded-full bg-white opacity-20"
    />
  );
}
