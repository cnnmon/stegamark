import Image from 'next/image';
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col justify-between items-center w-full p-4 border-b-2 border-[#0016DB] fixed top-0 bg-[#ffebd3] z-50">
      <div className="w-full max-w-[900px] ml-4 flex justify-between items-center">
        <Image
          src="/stegalogo.svg"
          alt="stegamark logo"
          width={60}
          height={60}
          className="cursor-pointer"
          onClick={() => window.location.href="/"}
        />
        <div className="flex flex-row gap-4">
          <Link href="/about">About this project</Link> |
          <Link href="/encode">Encode</Link> |
          <Link href="/decode">Decode</Link>
        </div>
      </div>
    </div>
  );
}