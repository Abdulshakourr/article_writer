
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers:  headers(),
  });


  if (!session) {
    return <h1 className="text-xl font-semibold">Not authenticated!</h1>;
  }

  return (
    <div className="flex items-center justify-center flex-col gap-4  h-screen">
      <div className="flex flex-col gap-4 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-300">To edit your arcticles click on the button below</h1>
        <Button variant="outline" className="font-bold text-center"><Plus /> Add Article</Button>
      </div>
    </div>
  );
}
