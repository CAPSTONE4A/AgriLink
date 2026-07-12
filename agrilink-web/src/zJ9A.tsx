import { Card } from '@/components/molecules/Card';
import { Avatar } from '@/components/atoms/Avatar';

const ProfilePage = () => (
  <section className="space-y-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">Your farmer profile and contact details.</p>
      </div>
      <Avatar name="Mang Romy" />
    </div>
    <Card title="Account Information">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Name</p>
          <p className="mt-1 text-base font-semibold text-slate-900">Mang Romy</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Role</p>
          <p className="mt-1 text-base font-semibold text-slate-900">Farmer</p>
        </div>
      </div>
    </Card>
  </section>
);

export default ProfilePage;
