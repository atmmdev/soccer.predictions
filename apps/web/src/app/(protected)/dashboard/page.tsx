import { RecentMatches } from "@/features/dashboard/components/recent-matches";
import { StatsCards } from "@/features/dashboard/components/stats-cards";


export default function DashboardPage() {
  return (
    <>
      <StatsCards />
      <RecentMatches />
    </>
  );
}
