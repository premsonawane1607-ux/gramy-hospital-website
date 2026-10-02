import Image from "next/image";
import Link from "next/link";
import { localImage } from "@/lib/images";

export default function SpecialistCard({
  slug,
  title,
  heroImg,
  doctorCount,
}: {
  slug: string;
  title: string;
  heroImg: string | null;
  doctorCount: number;
}) {
  const local = localImage(heroImg);
  return (
    <Link href={`/specialists/${slug}`} className="card-shadow group overflow-hidden rounded-card bg-white">
      <div className="relative aspect-[4/3] w-full bg-main/10">
        {local && <Image src={local} alt={title} fill className="object-cover transition group-hover:scale-105" />}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold group-hover:text-main">{title}</h3>
        <p className="mt-1 text-sm text-paragraph">{doctorCount} Doctor{doctorCount === 1 ? "" : "s"} Available</p>
      </div>
    </Link>
  );
}
