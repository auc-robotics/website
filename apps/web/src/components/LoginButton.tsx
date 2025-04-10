import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "react-aria-components";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <Button
      onPress={() => {
        if (session) signOut();
        else signIn("google");
      }}
      className="bg-secondary relative flex size-12 cursor-pointer items-center justify-center rounded-full text-white"
    >
      {session?.user ? (
        <div className="relative size-full overflow-hidden rounded-full">
          <Image
            className="absolute inset-0"
            src={session.user.image!}
            fill
            alt={session.user.name!}
          />
          <div className="bg-secondary absolute inset-0 flex size-full items-center justify-center opacity-0 transition hover:opacity-100">
            <LogOut />
          </div>
        </div>
      ) : (
        <LogIn />
      )}
    </Button>
  );
}
