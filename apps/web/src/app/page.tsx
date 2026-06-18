import Link from 'next/dist/client/link';


export default function Home() {
  return (
    <div className='py-2'>
      <Link
        href='/dashboard'
        className='mt-10 text-lg font-medium text-blue-600'
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
