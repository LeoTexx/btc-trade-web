import { useEffect, useState } from "react";

export function useSSE(url: string, onEvent: (event: MessageEvent) => void) {
  const [history, setHistory] = useState<MessageEvent[]>([]);
  useEffect(() => {
    let isMounted = true;

    const eventSource = new EventSource(url);

    eventSource.onopen = (event) => {
      console.log("Connection opened:", event);
    };

    eventSource.onmessage = (event: MessageEvent) => {
      if (isMounted) {
        setHistory((prevValue) => [...prevValue, event]);
        onEvent(event);
      }
    };

    eventSource.onerror = (event) => {
      console.error("EventSource failed:", event);
      if (isMounted) {
        eventSource.close();
      }
    };

    return () => {
      isMounted = false;
      console.log("Connection closed");
      eventSource.close();
    };
  }, [url, onEvent]);

  return { history };
}
