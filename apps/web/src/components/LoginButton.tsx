import { LogIn } from "lucide-react";
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
        <Image
          className="rounded-full"
          src={session.user.image!}
          fill
          alt={session.user.name!}
        />
      ) : (
        <LogIn />
      )}
    </Button>
  );
}
