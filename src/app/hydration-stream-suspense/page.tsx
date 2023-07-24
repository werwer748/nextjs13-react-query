import Counter from "./counter";
import ListUsers from "./list-user";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main>
      <Counter />
      <Suspense fallback={<p>서스팬스 로딩중...</p>}>
        <ListUsers />
      </Suspense>
    </main>
  );
}
