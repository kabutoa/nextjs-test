"use client";

import { FormEvent, useEffect, useState } from "react";

type TUser = {
  id: number;
  name: string;
  email: string;
};

export default function Page() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Failed to create user");

      const newUser = await res.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setName("");
      setEmail("");
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to create user");
    }
  };

  if (error) {
    return <p className="text-red-600">{error ?? "internal error"}</p>;
  }

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span className="font-bold">{user.name}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
