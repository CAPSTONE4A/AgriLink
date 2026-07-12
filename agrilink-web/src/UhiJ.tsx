import { useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/molecules/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { InlineSpinner } from '@/components/atoms/Spinner';
import { useProfile, useUpdateProfile } from '@/hooks/useFarmerApi';
import type { Gender } from '@/types/auth';

const ProfilePage = () => {
  const { data: user, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [avatarUrl, setAvatarUrl] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    if (!user) return;
    setAvatarUrl(user.avatarUrl ?? '');
    setGender(user.gender ?? '');
    setBirthday(user.birthday ?? '');
  }, [user]);

  const headerAvatar = useMemo(
    () => ({
      name: user?.name ?? 'Farmer',
      imageUrl: user?.avatarUrl || undefined,
    }),
    [user],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      avatarUrl,
      gender: gender || undefined,
      birthday: birthday || undefined,
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">Your farmer profile and contact details.</p>
        </div>

        <Avatar name={headerAvatar.name} imageUrl={headerAvatar.imageUrl} />
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          <InlineSpinner />
          <p className="mt-3 text-sm">Loading profile...</p>
        </div>
      ) : (
        <Card title="Account Information" description="Update your avatar, gender, and birthday.">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: read-only account details */}
            <div>
              <div className="flex items-start gap-4">
                <Avatar
                  name={user?.name ?? 'Farmer'}
                  imageUrl={user?.avatarUrl || undefined}
                  className="h-14 w-14"
                />
                <div>
                  <p className="text-sm text-slate-500">Username</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{user?.name}</p>

                  <div className="mt-3">
                    <p className="text-sm text-slate-500">Role</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{user?.role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">Barangay</p>
                  <p className="text-sm font-semibold text-slate-900">{user?.barangay}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">Municipality</p>
                  <p className="text-sm font-semibold text-slate-900">{user?.municipality}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">Province</p>
                  <p className="text-sm font-semibold text-slate-900">{user?.province}</p>
                </div>
              </div>
            </div>

            {/* Right: editable fields */}
            <div>
              <form className="space-y-5" onSubmit={onSubmit}>
                <div>
                  <div className="flex items-center gap-4">
                    <Avatar
                      name={user?.name ?? 'Farmer'}
                      imageUrl={avatarUrl || undefined}
                      className="h-14 w-14"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Avatar URL</p>
                      <p className="mt-1 text-xs text-slate-400">Use an image URL. (File upload can be added later.)</p>
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-1">
                  <div>
                    <p className="text-sm text-slate-500">Gender</p>
                    <select
                      value={gender}
                      onChange={(e) => setGender((e.target.value as Gender | '') ?? '')}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Birthday</p>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updateProfileMutation.isPending ? 'Saving...' : 'Save changes'}
                  </button>
                </div>

                {updateProfileMutation.isError ? (
                  <p className="text-sm text-red-600">Failed to update profile. Please try again.</p>
                ) : null}
              </form>
            </div>
          </div>
        </Card>
      )}
    </section>
  );
};

export default ProfilePage;
