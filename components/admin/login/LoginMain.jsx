"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [hash, setHash] = useState("");
  const [logging, setLogging] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogging(true);
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hash }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert("Logged in successfully");
      router.push("/admin/events");
    } else {
      alert("Failed to log in");
    }
    setLogging(false);
  };

  return (
    <div style={styles.container} className="w-full">
      <div style={styles.overlay}>
        {logging && (
          <div className="absolute top-0 left-0 h-full w-full bg-red-200/50 backdrop-blur-md rounded-lg">
            HELLO
          </div>
        )}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Enter Hash"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      'url("https://th.bing.com/th/id/R.61f58fb8b7889b3e936df092c61271e2?rik=u9bBia9tGGbX7g&pid=ImgRaw&r=0") no-repeat center center fixed',
    backgroundSize: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    width: "500px",
    textAlign: "center",
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    textAlign: "center",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
