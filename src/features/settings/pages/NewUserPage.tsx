import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, UserCog, type LucideIcon } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  ImageUpload,
  Input,
  PageHeader,
} from '@components';
import { ROUTES } from '@common/constants';
import { useRoles } from '@features/roles';
import { cn } from '@lib/cn';
import { useCreateUser } from '../../users/hooks/useUsers';
import { createUserSchema, type CreateUserFormValues } from '../../users/schemas/users.schema';

interface NewUserSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const SECTIONS: NewUserSection[] = [
  { id: 'personal', label: 'Personal Information', icon: UserCog },
  { id: 'roles', label: 'Roles & Access', icon: ShieldCheck },
];

export default function NewUserPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const createUser = useCreateUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { isSuperuser: false, roleIds: [], image: null },
  });

  const { data: rolesData } = useRoles({ page: 1, pageSize: 100 });
  const roleOptions = rolesData?.data ?? [];

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
  };

  const onSubmit = (values: CreateUserFormValues) => {
    const { confirmPassword: _confirmPassword, ...dto } = values;
    createUser.mutate(dto, { onSuccess: () => navigate('/users') });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader
          title="Add New User"
          description="Create a user account and assign their roles."
          actions={
            <div className="flex items-center gap-2">
              <Link to={ROUTES.SETTINGS}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" isLoading={createUser.isPending}>
                Save
              </Button>
            </div>
          }
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <Card className="h-fit p-2 lg:sticky lg:top-6">
            <nav className="flex flex-col pb-8">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      'relative flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors',
                      isActive
                        ? 'bg-primary/10 font-semibold text-foreground'
                        : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute inset-y-0 left-0 w-3px',
                        isActive ? 'bg-primary' : 'bg-muted-foreground/70',
                      )}
                      aria-hidden
                    />
                    <section.icon className={cn('size-4 shrink-0', isActive && 'text-primary')} />
                    <span className="truncate">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>

          <div className="space-y-6">
            {activeSection === 'personal' && (
              <>
                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <span className="mb-2 block text-xs font-bold text-[#1d252db3]">
                        Profile photo
                      </span>
                      <Controller
                        control={control}
                        name="image"
                        render={({ field }) => (
                          <ImageUpload
                            className="w-35 h--35"
                            onChange={(file) => field.onChange(file)}
                          />
                        )}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="First name"
                        required
                        {...register('firstName')}
                        error={errors.firstName?.message}
                      />
                      <Input
                        label="Last name"
                        {...register('lastName')}
                        error={errors.lastName?.message}
                      />

                      <Input
                        label="Email"
                        type="email"
                        required
                        {...register('email')}
                        error={errors.email?.message}
                      />
                      <Input
                        label="Phone number"
                        required
                        {...register('phoneNumber')}
                        error={errors.phoneNumber?.message}
                      />
                      <Input
                        label="Date of birth"
                        type="date"
                        required
                        {...register('dateOfBirth')}
                        error={errors.dateOfBirth?.message}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle>Address Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Address 1"
                        placeholder="Enter Address 1"
                        {...register('address1')}
                        error={errors.address1?.message}
                      />
                      <Input
                        label="Address 2"
                        placeholder="Enter Address 2"
                        {...register('address2')}
                        error={errors.address2?.message}
                      />
                      <Input
                        label="Country"
                        placeholder="Enter Country"
                        {...register('country')}
                        error={errors.country?.message}
                      />
                      <Input
                        label="State"
                        placeholder="Enter State"
                        {...register('state')}
                        error={errors.state?.message}
                      />

                      <Input
                        label="City"
                        placeholder="Enter City"
                        {...register('city')}
                        error={errors.city?.message}
                      />
                      <Input
                        label="Pincode"
                        placeholder="Enter Pincode"
                        className="sm:max-w-[200px]"
                        {...register('pincode')}
                        error={errors.pincode?.message}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle>Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Password"
                        placeholder="Enter Password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        error={errors.password?.message}
                        rightIcon={
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        }
                      />
                      <Input
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                        rightIcon={
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSection === 'roles' && (
              <Card>
                <CardHeader className="border-b border-border pb-4">
                  <CardTitle>Roles & Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <Checkbox label="Superuser" {...register('isSuperuser')} />
                  <div>
                    <span className="mb-2 block text-xs font-bold text-[#1d252db3]">Roles</span>
                    <Controller
                      control={control}
                      name="roleIds"
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-3">
                          {roleOptions.map((role) => (
                            <Checkbox
                              key={role.id}
                              label={role.name}
                              checked={(field.value ?? []).includes(Number(role.id))}
                              onChange={(e) => {
                                const current = field.value ?? [];
                                const roleId = Number(role.id);
                                field.onChange(
                                  e.target.checked
                                    ? [...current, roleId]
                                    : current.filter((id) => id !== roleId),
                                );
                              }}
                            />
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
