import ShareButton from './ShareButton';

// This is a server component that wraps the client component
export default function ShareButtonContainer({ title }: { title: string }) {
  return (
    <div className="flex space-x-3">
      <ShareButton title={title} />
    </div>
  );
} 