import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8">Wordle Clone</h1>
          <p className="text-xl mb-12">Challenge yourself with our daily word puzzle!</p>
          
          <div className="space-y-4">
            {session ? (
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/game">Play Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/leaderboard">Leaderboard</Link>
                </Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}