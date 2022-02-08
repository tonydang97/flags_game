import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

export default function Header() {
  const [session] = useSession();

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="flex text-2xl justify-evenly py-5">
      <Link href="/">HOME</Link>
      <Link href="/Games">GAMES</Link>
      {session && (
        <a href="#" onClick={handleSignout} className="btn-signin">
          SIGN OUT
        </a>
      )}
      {!session && (
        <a href="#" onClick={handleSignin} className="btn-signin">
          SIGN IN
        </a>
      )}
    </div>
  );
}
