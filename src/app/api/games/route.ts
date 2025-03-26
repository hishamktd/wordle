import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { games, leaderboard } from "@/lib/db/schema";
import { authOptions } from "../auth/[...nextauth]/route";
import { eq } from "drizzle-orm";

interface ExtendedSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}


export async function POST(req: Request) {
  try {
    const session :ExtendedSession | null= await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { word, attempts, won } = await req.json();

    // Save game result
    await db.insert(games).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      word,
      attempts,
      completed: true,
      won,
    });

    // Update leaderboard
    const userStats = await db.query.leaderboard.findFirst({
      where: eq(leaderboard.userId, session.user.id),
    });

    if (userStats) {
      const totalGames = userStats.totalGames + 1;
      const gamesWon = userStats.gamesWon + (won ? 1 : 0);
      const averageAttempts = Math.round(
        (userStats.averageAttempts * userStats.totalGames + attempts) / totalGames
      );

      await db
        .update(leaderboard)
        .set({
          totalGames,
          gamesWon,
          averageAttempts,
          updatedAt: new Date(),
        })
        .where(eq(leaderboard.userId, session.user.id));
    } else {
      await db.insert(leaderboard).values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        totalGames: 1,
        gamesWon: won ? 1 : 0,
        averageAttempts: attempts,
      });
    }

    return NextResponse.json({ message: "Game saved successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}