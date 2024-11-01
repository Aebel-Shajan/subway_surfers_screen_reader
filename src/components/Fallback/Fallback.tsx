import Button from "@/components/Button/Button";

interface FallbackProps {
  error: Error
}

const Fallback = ({ error}: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong 😢:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button
        onClick={() => window.open(
          "https://github.com/Aebel-Shajan/subway_surfers_screen_reader/issues"
        )}
      >
        Report bug
      </Button>
      <p>Troubleshooting: Try opening and closing the sidepanel 2 times. It should fix the error.</p>
    </div>
  );
}

export default Fallback