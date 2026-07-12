import { Card } from '@/components/molecules/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { InlineSpinner } from '@/components/atoms/Spinner';
import { useProfile } from '@/hooks/useFarmerApi';

const ProfilePage = () => {
  const { data: user, isLoading } = useProfile();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">Your farmer profile and contact details.</p>
        </div>
        <Avatar name={user?.name ?? 'Farmer'} />
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          <InlineSpinner />
          <p className="mt-3 text-sm">Loading profile...</p>
        </div>
      ) : (
        <Card title="Account Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{user?.role}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Barangay</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{user?.barangay}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Municipality</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{user?.municipality}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Province</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{user?.province}</p>
            </div>
          </div>
        </Card>
      )}
    </section>
  );
};

export default ProfilePage;
