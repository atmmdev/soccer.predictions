interface DashboardSectionTitleProps {
  children: React.ReactNode;
}

export function DashboardSectionTitle({ children }: DashboardSectionTitleProps) {
  return <h2 className='section-title mb-3'>{children}</h2>;
}
