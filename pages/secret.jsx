import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function Secret() {
  const [session, loading] = useSession();
  const [content, setContent] = useState("nothing");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main className="h-screen">
        <div>
          <h1>You aren't signed in please sign in</h1>
        </div>
      </main>
    );
  }
  return (
    <main className="h-screen">
      <div>
        <h1>Protected Page</h1>
        The content is: <p>{content}</p>
      </div>
    </main>
  );
}
