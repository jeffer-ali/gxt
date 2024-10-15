import Image from "next/image";
import { accountDetails, main } from "@/lib/db"
import { List } from "@/components/list"

export default async function ProfilePage() {
  // await main();
  const res = await accountDetails('utest1')
  console.log(res)
  return (
    <div className="w-full min-h-screen">
      <List list={res} />
    </div>
    
  );
}
