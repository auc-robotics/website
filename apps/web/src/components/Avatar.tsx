import Image from "next/image";
import Card from "@/components/Card";

export default function Avatar({
  src,
  name,
  position,
  description,
}: {
  src: string;
  name: string;
  position: string;
  description?: string;
}) {
  return (
    <Card className="h-full w-full duration-300 hover:-translate-y-1">
      <div className="flex h-full flex-col items-center bg-slate-50">
        <Image
          src={src}
          className="mb-2 aspect-square w-full object-center"
          alt={`Photo of ${name}.`}
          width={512}
          height={512}
        />
        <div className="text-secondary mb-4 flex h-full w-full flex-col px-4">
          <h3 className="text-center text-xl">
            <span className="font-black">{name}</span>, <br />
            {position}
          </h3>
          {description && (
            <>
              <div className="-mx-4 my-2 border-b border-slate-400"></div>
              <p className="h-full text-center">{description}</p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
