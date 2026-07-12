import { useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/molecules/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { InlineSpinner } from '@/components/atoms/Spinner';
import { useProfile, useUpdateProfile } from '@/hooks/useFarmerApi';
import type { Gender } from '@/types/auth';

type EditKey = 'avatarUrl' | 'gender' | 'barangay' | 'municipality' | 'province' | 'phone';

const ProfilePage = () => {
  const { data: user, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [avatarUrl, setAvatarUrl] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [barangay, setBarangay] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState('');

  const [editKey, setEditKey] = useState<EditKey | null>(null);

  useEffect(() => {
    if (!user) return;
    setAvatarUrl(user.avatarUrl ?? '');
    setGender(user.gender ?? '');
    setBarangay(user.barangay ?? '');
    setMunicipality(user.municipality ?? '');
    setProvince(user.province ?? '');
    setPhone((user as any).phone ?? '');
  }, [user]);

  const headerAvatar = useMemo(
    () => ({
      name: user?.name ?? 'Farmer',
      imageUrl: user?.avatarUrl || undefined,
    }),
    [user],
  );

  const cancelEdit = () => {
    if (!user) return;
    setAvatarUrl(user.avatarUrl ?? '');
    setGender(user.gender ?? '');
    setBarangay(user.barangay ?? '');
    setMunicipality(user.municipality ?? '');
    setProvince(user.province ?? '');
    setPhone((user as any).phone ?? '');
    setEditKey(null);
  };

  const saveField = (key: EditKey) => {
    if (!user) return;

    const payload: Record<string, unknown> = {};

    switch (key) {
      case 'avatarUrl':
        payload.avatarUrl = avatarUrl;
        break;
      case 'gender':
        payload.gender = gender === '' ? undefined : gender;
        break;
      case 'barangay':
        payload.barangay = barangay;
        break;
      case 'municipality':
        payload.municipality = municipality;
        break;
      case 'province':
        payload.province = province;
        break;
      case 'phone':
        payload.phone = phone;
        break;
    }

    updateProfileMutation.mutate(payload as any);
    setEditKey(null);
  };

  const startEdit = (key: EditKey) => setEditKey(key);

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
        <Card title="Account Information" description="Edit your profile details using the pencil icons.">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* LEFT: Account Information */}
            <div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar name={user?.name ?? 'Farmer'} imageUrl={avatarUrl || undefined} className="h-20 w-20" />
                  <button
                    type="button"
                    aria-label="Edit avatar"
                    className="absolute -right-2 -bottom-2 rounded-full bg-white px-2 py-1 text-sm shadow"
                    onClick={() => startEdit('avatarUrl')}
                  >
                    ✏️
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-slate-500">Username</p>
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <p className="text-base font-semibold text-slate-900">{user?.name}</p>
                    <button
                      type="button"
                      aria-label="Edit username"
                      className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                      onClick={() => startEdit('phone')}
                    >
                      ✏️
                    </button>
                  </div>
                </div>

                <div className="mt-6 w-full space-y-3">
                  {/* Email (view only) */}
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">Email</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
                      <button
                        type="button"
                        aria-label="Edit email"
                        className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                        onClick={() => startEdit('phone')}
                      >
                        ✏️
                      </button>
                    </div>
                  </div>


                  {/* Gender */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-500">Gender</p>
                    <div className="flex items-center gap-3">
                      {editKey !== 'gender' ? (
                        <p className="text-sm font-semibold text-slate-900">{user?.gender ?? 'Not set'}</p>
                      ) : (
                        <select
                          value={gender}
                          onChange={(e) => setGender((e.target.value as Gender | '') ?? '')}
                          className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      )}

                      <button
                        type="button"
                        className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                        onClick={() => (editKey === 'gender' ? cancelEdit() : startEdit('gender'))}
                      >
                        {editKey === 'gender' ? '✖' : '✏️'}
                      </button>
                    </div>
                  </div>

                  {/* Barangay */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-500">Barangay</p>
                    <div className="flex items-center gap-3">
                      {editKey !== 'barangay' ? (
                        <p className="text-sm font-semibold text-slate-900">{user?.barangay ?? 'Not set'}</p>
                      ) : (
                        <input
                          value={barangay}
                          onChange={(e) => setBarangay(e.target.value)}
                          className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                        />
                      )}

                      <button
                        type="button"
                        className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                        onClick={() => (editKey === 'barangay' ? cancelEdit() : startEdit('barangay'))}
                      >
                        {editKey === 'barangay' ? '✖' : '✏️'}
                      </button>
                    </div>
                  </div>

                  {/* Municipality */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-500">Municipality</p>
                    <div className="flex items-center gap-3">
                      {editKey !== 'municipality' ? (
                        <p className="text-sm font-semibold text-slate-900">{user?.municipality ?? 'Not set'}</p>
                      ) : (
                        <input
                          value={municipality}
                          onChange={(e) => setMunicipality(e.target.value)}
                          className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                        />
                      )}

                      <button
                        type="button"
                        className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                        onClick={() => (editKey === 'municipality' ? cancelEdit() : startEdit('municipality'))}
                      >
                        {editKey === 'municipality' ? '✖' : '✏️'}
                      </button>
                    </div>
                  </div>

                  {/* Province */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-500">Province</p>
                    <div className="flex items-center gap-3">
                      {editKey !== 'province' ? (
                        <p className="text-sm font-semibold text-slate-900">{user?.province ?? 'Not set'}</p>
                      ) : (
                        <input
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                        />
                      )}

                      <button
                        type="button"
                        className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                        onClick={() => (editKey === 'province' ? cancelEdit() : startEdit('province'))}
                      >
                        {editKey === 'province' ? '✖' : '✏️'}
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-500">Phone</p>
                    <div className="flex items-center gap-3">
                      {editKey !== 'phone' ? (
                        <p className="text-sm font-semibold text-slate-900">{(user as any).phone ?? 'Not set'}</p>
                      ) : (
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                        />
                      )}

                      <button
                        type="button"
                        className="rounded-xl px-3 py-1 text-sm font-semibold text-green-700 hover:bg-green-50"
                        onClick={() => (editKey === 'phone' ? cancelEdit() : startEdit('phone'))}
                      >
                        {editKey === 'phone' ? '✖' : '✏️'}
                      </button>
                    </div>
                  </div>

                  {/* Avatar URL editor (when editKey = avatarUrl) */}
                  {editKey === 'avatarUrl' ? (
                    <div>
                      <p className="text-sm text-slate-500">Avatar URL</p>
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Save bar (only shows when editing) */}
                {editKey ? (
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                      onClick={cancelEdit}
                      disabled={updateProfileMutation.isPending}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => saveField(editKey)}
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                ) : null}

                {updateProfileMutation.isError ? (
                  <p className="mt-4 text-center text-sm text-red-600">Failed to update profile. Please try again.</p>
                ) : null}
              </div>
            </div>

            {/* RIGHT: custom panel */}
            <div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Profile Summary</h2>
                <p className="text-sm text-slate-500">Quick overview for capstone research.</p>

                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Role</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">{user?.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Status</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">Active</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {[user?.barangay, user?.municipality, user?.province].filter(Boolean).join(', ') || 'Not set'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-500">Completeness</p>
                      <p className="text-sm font-semibold text-slate-900">{[
                        user?.avatarUrl,
                        user?.gender,
                        user?.barangay,
                        user?.municipality,
                        user?.province,
                        (user as any).phone,
                      ].filter(Boolean).length}/6</p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-500">Account type</p>
                      <p className="text-sm font-semibold text-slate-900">Farmer</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">Capstone notes</p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
                    <li>Track profile completeness and update frequency.</li>
                    <li>Measure how profile data improves user recommendations.</li>
                    <li>Study user trust when editing personal information.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </section>
  );
};

export default ProfilePage;

