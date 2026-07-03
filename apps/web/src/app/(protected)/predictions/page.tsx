import { PredictionList } from '@/features/predictions/components/prediction-list';

export default function PredictionsPage() {
  return (
    <div className='flex min-w-0 flex-col gap-4'>
      <PredictionList />
    </div>
  );
}
