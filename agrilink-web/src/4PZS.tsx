import { Card } from '@/components/molecules/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { useAuthStore } from '@/stores/auth.store';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">Your farmer profile and contact details.</p>
        </div>
        <Avatar name={user?.name ?? 'Farmer'} />
      </div>
      <Card title="Account Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user?.name ?? 'Farmer'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user?.role ?? 'Farmer'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user?.email ?? 'demo@agrilink.ph'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Barangay</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user?.barangay ?? 'Calauan'}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ProfilePage;
