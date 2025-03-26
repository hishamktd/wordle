import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function LeaderboardPage() {
  // const stats: { id: string; totalGames: number; gamesWon: number; averageAttempts: number }[] = await db.query.leaderboard.findMany({
  //   orderBy: (leaderboard, { desc }) => [
  //     desc(leaderboard.gamesWon),
  //     desc(leaderboard.averageAttempts),
  //   ],
  //   limit: 10,
  //   with: {
  //     user: true,
  //   },
  // });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
        
        <div className="bg-white/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Rank</TableHead>
                <TableHead className="text-white">Player</TableHead>
                <TableHead className="text-white text-right">Games Played</TableHead>
                <TableHead className="text-white text-right">Games Won</TableHead>
                <TableHead className="text-white text-right">Win Rate</TableHead>
                <TableHead className="text-white text-right">Avg. Attempts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {stats.map((stat, index) => (
                <TableRow key={stat.id}>
                  <TableCell className="text-white">{index + 1}</TableCell>
                  <TableCell className="text-white">{'stat.user?.name'}</TableCell>
                  <TableCell className="text-white text-right">{stat.totalGames}</TableCell>
                  <TableCell className="text-white text-right">{stat.gamesWon}</TableCell>
                  <TableCell className="text-white text-right">
                    {Math.round((stat.gamesWon / stat.totalGames) * 100)}%
                  </TableCell>
                  <TableCell className="text-white text-right">{stat.averageAttempts}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}