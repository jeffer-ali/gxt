import Image from "next/image";
import { ScrollList } from "./scroll-list"
import data from "./data.json";

export default async function ProfilePage() {
   
    return (
    <div className="w-full min-h-screen">
      <ScrollList data={data} />
    </div>
    
  );
}
