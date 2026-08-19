import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, Input } from '@components';
import { useRoles } from '@features/roles';
import { userSchema, type UserFormValues } from '../schemas/users.schema';

export const USER_FORM_ID = 'user-form';

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  readOnly?: boolean;
}

export function UserForm({ defaultValues, onSubmit, readOnly = false }: UserFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { isSuperuser: false, roleIds: [], ...defaultValues },
  });

  const { data: rolesData } = useRoles({ page: 1, pageSize: 100 });
  const roleOptions = rolesData?.data ?? [];

  return (
    <form id={USER_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input
        label="Email"
        type="email"
        required
        disabled={readOnly}
        {...register('email')}
        error={errors.email?.message}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First name"
          required
          disabled={readOnly}
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last name"
          disabled={readOnly}
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Phone number"
          required
          disabled={readOnly}
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
        <Input
          label="Date of birth"
          type="date"
          required
          disabled={readOnly}
          {...register('dateOfBirth')}
          error={errors.dateOfBirth?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Address 1"
          disabled={readOnly}
          {...register('address1')}
          error={errors.address1?.message}
        />
        <Input
          label="Address 2"
          disabled={readOnly}
          {...register('address2')}
          error={errors.address2?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Country"
          disabled={readOnly}
          {...register('country')}
          error={errors.country?.message}
        />
        <Input
          label="State"
          disabled={readOnly}
          {...register('state')}
          error={errors.state?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="City"
          disabled={readOnly}
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="Pincode"
          disabled={readOnly}
          {...register('pincode')}
          error={errors.pincode?.message}
        />
      </div>

      <Checkbox label="Superuser" disabled={readOnly} {...register('isSuperuser')} />

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
                  disabled={readOnly}
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
    </form>
  );
}
