"use client";
import Image from "next/image";
import { useRef } from "react";

export default function Avatar({
  src,
  name,
  position,
  description,
  // orientation = "left",
}: {
  src: string;
  name: string;
  position: string;
  description: string;
  // orientation?: "left" | "right";
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  // useEffect(() => {
  //   if (imageRef.current) {
  //     const i = imageRef.current;
  //     const rect = i.getBoundingClientRect();
  //     setOx(i.offsetLeft + rect.width / 2);
  //     setOy(i.offsetTop + rect.height / 2);
  //     console.log(i.offsetLeft, i.offsetTop);
  //   }
  // }, []);
  return (
    <div className="text-secondary flex w-auto flex-col items-center gap-4 rounded-xl bg-slate-200 p-4">
      <div className="flex flex-col items-center">
        <Image
          ref={imageRef}
          src={src}
          className="mb-2 size-64 rounded-full border-5 border-slate-400 object-cover object-center"
          alt={`Photo of ${name}.`}
          width={500}
          height={500}
        />
        <div className="text-primary text-xl">
          <h3>
            <span className="font-bold">{name}</span>, {position}
          </h3>
        </div>
      </div>

      <p className="w-80 text-lg font-medium">{description}</p>
    </div>
  );
}
