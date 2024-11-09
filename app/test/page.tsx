import { db } from "@/lib/db";

export default async function test() {
  const data = await db.user.findMany();

  console.log("USERS", data);

  return (
    <>
      <h1>Hello world</h1>
      {data.map((user) => (
        <div>
          <h1 className="text-xl font-semibold py-4">{user.email}</h1>
          <p className="text-gray-500">{user.name}</p>
        </div>
      ))}
    </>
  );
}
