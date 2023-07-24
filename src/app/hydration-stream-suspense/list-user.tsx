"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/types";
import Image from "next/image";

async function getUsers() {
  return (await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  )) as User[];
}

export default function ListUsers() {
  const { data, isLoading, isFetching, error } = useQuery<User[]>({
    queryKey: ["hydrate-users"],
    queryFn: () => getUsers(),
    suspense: true,
    staleTime: 5 * 1000,
  });

  return (
    <>
      {error ? (
        <p>에러뜸....ㅠㅜ</p>
      ) : isFetching || isLoading ? (
        <p style={{ textAlign: "center" }}>클라딴에서 로딩중...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {data?.map((user) => (
            <div
              key={user.id}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                style={{ width: 180, height: 180 }}
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
