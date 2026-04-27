export function startTrainingCommitmentScheduler() {
  const interval = setInterval(() => {
    console.log("Checking training commitment violations...");
  }, 60_000);

  return () => clearInterval(interval);
}

