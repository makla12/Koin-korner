import Image from 'next/image';
import wip from "@/public/wip.png";
import { MainNav } from '@/components/elements/MainNav';


function WIPPage() {
  return (
    <>
		<MainNav />
        <div className="flex justify-center items-center">
            <Image src={wip} alt="work in progress"/>
        </div>
        <h1 className="text-3xl text-center my-10">Nadal trwają prace nad tą stroną</h1>
    </>
  );
}

export { WIPPage };