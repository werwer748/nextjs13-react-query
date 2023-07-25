import getQueryClient from "@/utils/getQueryClient";
import { User } from "../types";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/utils/hydrate.client";
import ListUsers from "./list-users";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
