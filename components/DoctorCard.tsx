import Image from "next/image";
import Link from "next/link";
import { localImage } from "@/lib/images";

export default function DoctorCard({
  name,
  designation,
  img,
  href,
}: {
  name: string;
  designation: string;
  img: string | null;
  href?: string | null;
}) {
  const local = localImage(img);
  const nameEl = href ? (
    <Link href={href} className="hover:text-main">
      {name}
    </Link>
  ) : (
    name
  );

  return (
    <div className="card-shadow overflow-hidden rounded-card bg-white">
      <div className="relative aspect-[4/5] w-full bg-main/10">
        {local ? (
          <Image src={local} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-main/40">
            {name.slice(0, 1)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{nameEl}</h3>
        <p className="mt-1 text-sm text-paragraph">{designation}</p>
        <a href="tel:022-35347300" className="default-btn mt-4 !py-2 !px-5 text-xs">
          Book an appointment
        </a>
      </div>
    </div>
  );
}
