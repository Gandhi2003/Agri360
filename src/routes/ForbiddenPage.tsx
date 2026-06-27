import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { ROUTES } from '@common/constants';
import { Button } from '@components/ui/Button';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="rounded-full bg-danger/10 p-4 text-danger">
        <ShieldAlert className="size-8" />
      </span>
      <p className="text-4xl font-bold">403</p>
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="max-w-md text-muted-foreground">
        You don’t have permission to view this page. Contact your administrator if you believe this
        is a mistake.
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
