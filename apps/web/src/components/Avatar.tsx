"use client";
import Image from "next/image";

export default function Avatar({
  src,
  name,
  position,
  description,
}: {
  src: string;
  name: string;
  position: string;
  description: string;
}) {
  return (
    <div className="text-secondary flex w-auto flex-col items-center gap-4 rounded-xl bg-slate-200 p-4">
      <div className="flex flex-col items-center">
        <Image
          src={src}
          className="mb-4 size-80 rounded-full border-5 border-slate-400 object-cover object-center"
          alt={`Photo of ${name}.`}
          width={500}
          height={500}
        />
        <div className="text-primary text-xl">
          <h3>
            <span className="font-extrabold">{name}</span>, {position}
          </h3>
        </div>
      </div>

      <p className="w-80 text-lg font-medium">{description}</p>
    </div>
  );
}
