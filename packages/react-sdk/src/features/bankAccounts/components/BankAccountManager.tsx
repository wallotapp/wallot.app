import { useEffect, useState } from 'react';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	isBankAccountTokenized,
	BankAccount,
	TokenizeBankAccountParams,
	tokenizeBankAccountSchema,
} from '@wallot/js';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useController, useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@wallot/react/src/features/users';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useTokenizeBankAccountMutation } from '@wallot/react/src/features/bankAccounts';

type BankAccountManagerProps = {
	bankAccount: BankAccount;
	isRoutingNumberShown: (bankAccountId: string) => boolean;
	isTokenizationFormShown: (bankAccountId: string) => boolean;
	refetchBankAccountsForLoggedInUser: () => Promise<unknown>;
	toggleRoutingNumberShown: (bankAccountId: string) => () => void;
	toggleTokenizationFormShown: (bankAccountId: string) => () => void;
};
export function BankAccountManager({
	bankAccount,
	isRoutingNumberShown,
	isTokenizationFormShown,
	refetchBankAccountsForLoggedInUser,
	toggleRoutingNumberShown,
	toggleTokenizationFormShown,
}: BankAccountManagerProps) {
	// Toaster
	const { toast } = useToast();

	// Current User
	const {
		loggedInUser,
		isLoggedInUserLoading,
		refetch: refetchUser,
	} = useQueryLoggedInUser();
	const defaultBankAccountId = loggedInUser?.default_bank_account ?? 'null';

	const showTokenizationForm = isTokenizationFormShown(bankAccount._id);
	const handleToggleTokenizationForm = toggleTokenizationFormShown(
		bankAccount._id,
	);
	const showRoutingNumber = isRoutingNumberShown(bankAccount._id);
	const handleToggleRoutingNumber = toggleRoutingNumberShown(bankAccount._id);
	const isTokenized = isBankAccountTokenized(bankAccount);
	const isDefault = defaultBankAccountId === bankAccount._id;

	// Form Resolver
	const resolver = useYupValidationResolver(
		tokenizeBankAccountSchema,
		defaultGeneralizedFormDataTransformationOptions,
	);
	const initialFormData = tokenizeBankAccountSchema.getDefault();
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<TokenizeBankAccountParams>({
			defaultValues: initialFormData,
			resolver,
			shouldUnregister: false,
		});
	const liveData = watch();
	const isAccountNumberInputComplete = Boolean(liveData.account_number);

	const {
		mutate: tokenizeBankAccount,
		isLoading: isTokenizeBankAccountRunning,
	} = useTokenizeBankAccountMutation(bankAccount._id, {
		onError: ({ error: { message } }) => {
			// Show the error message
			toast({
				title: 'Error',
				description: message,
			});
			setError('root', {
				type: 'manual',
				message: 'An error occurred. Please try again.',
			});

			// Reset form
			reset();
		},
		onSuccess: async () => {
			// Refetch the bank accounts
			await refetchBankAccountsForLoggedInUser();

			// Show success toast
			toast({
				title: 'Success',
				description: 'Saved your bank account information...',
			});

			// Reset form
			reset();

			// Close the tokenization form
			handleToggleTokenizationForm();
		},
	});
	tokenizeBankAccount; // <== use this
	isTokenizeBankAccountRunning; // <== use this

	// Mutation
	const { mutate: updateUser, isLoading: isUpdateUserRunning } =
		useUpdateUserMutation({
			onError: ({ error: { message } }) => {
				// Show the error message
				toast({
					title: 'Error',
					description: message,
				});
			},
			onSuccess: async () => {
				// Refetch the user
				await refetchUser();

				// Show success toast
				toast({
					title: 'Success',
					description: 'Saved your default bank account...',
				});
			},
		});
	isUpdateUserRunning; // <== use this

	const setBankAccountAsUserDefault = () => {
		if (loggedInUser?._id == null) {
			toast({
				title: 'Error',
				description: 'Try logging in again',
			});
			return;
		}
		updateUser({
			_id: loggedInUser._id,
			default_bank_account: bankAccount._id,
		});
	};

	const onSubmit = (data: TokenizeBankAccountParams) => {
		console.log('Tokenizing bank account with following data:', data);
		toast({
			title: 'Saving your bank account information',
			description: 'This may take a few moments...',
		});
		tokenizeBankAccount(data);
	};

	const isTokenizeFormSubmitting =
		formState.isSubmitting || isTokenizeBankAccountRunning;
	const isTokenizeButtonDisabled =
		isLoggedInUserLoading ||
		isTokenizeFormSubmitting ||
		!isAccountNumberInputComplete;
	const isMakeDefaultButtonDisabled =
		isLoggedInUserLoading || isTokenizeFormSubmitting || isUpdateUserRunning;

	const { field: accountNumberField } = useController({
		control,
		disabled: isTokenizeFormSubmitting,
		name: 'account_number',
	});
	const { field: accountOwnerNameField } = useController({
		control,
		disabled: isTokenizeFormSubmitting,
		name: 'account_owner_name',
	});

	const [
		hasInitializedDefaultAccountOwnerName,
		setHasInitializedDefaultAccountOwnerName,
	] = useState(false);
	useEffect(() => {
		if (isLoggedInUserLoading) return;
		if (hasInitializedDefaultAccountOwnerName) return;

		const defaultValueAccountOwnerName = (
			(loggedInUser?.alpaca_account_identity?.given_name ?? '') +
			' ' +
			(loggedInUser?.alpaca_account_identity?.family_name ?? '')
		).trim();
		reset({
			...initialFormData,
			account_owner_name: defaultValueAccountOwnerName,
		});
		setHasInitializedDefaultAccountOwnerName(true);
	}, [
		isLoggedInUserLoading,
		hasInitializedDefaultAccountOwnerName,
		loggedInUser,
	]);

	return (
		<div
			key={bankAccount._id}
			className={cn(
				'flex justify-between border rounded-md p-4 mt-2 bg-slate-50/10',
				!isTokenized && isDefault ? 'border-amber-900' : 'border-slate-200',
				showTokenizationForm ? 'items-start' : 'items-center',
				'transition-all duration-200 grid grid-cols-2 gap-4',
			)}
		>
			<div className='flex items-center space-x-2 col-span-2 xl:col-span-1'>
				<div>
					<p className='font-normal text-sm'>
						{bankAccount.name} &nbsp;
						<span className='font-extrabold monospace text-gray-600'>
							· · · ·
						</span>{' '}
						<span className='font-extralight monospace text-gray-600 text-xs'>
							{bankAccount.last_4}
						</span>
					</p>
				</div>
				{isDefault && (
					<div className={cn('bg-slate-300 rounded-lg px-1.5 py-0.5')}>
						<p className='text-slate-800 text-[0.6rem]'>DEFAULT</p>
					</div>
				)}
				<div>
					{isTokenized ? (
						<div className='bg-blue-300 rounded-lg px-1.5 py-0.5'>
							<p className='text-blue-800 text-[0.6rem]'>CONNECTED</p>
						</div>
					) : (
						<div className='bg-red-300 rounded-lg px-1.5 py-0.5'>
							<p className='text-red-800 text-[0.6rem]'>ACTION REQUIRED</p>
						</div>
					)}
				</div>
			</div>
			<div
				className={cn(
					'col-span-2 xl:col-span-1',
					showTokenizationForm ? '' : 'hidden',
				)}
			>
				<form onSubmit={handleSubmit(onSubmit) as () => void}>
					<div className='text-right'>
						<p className='font-semibold text-xs text-right'>
							Routing Number
							<span className='text-amber-900'>*</span>
						</p>
						<div className='flex items-center space-x-2 justify-end'>
							<div>
								<button
									className='font-light text-xs'
									type='button'
									onClick={handleToggleRoutingNumber}
								>
									{showRoutingNumber ? (
										<p className=''>Hide</p>
									) : (
										<p className=''>Show</p>
									)}
								</button>
							</div>
							<div className='font-light text-sm'>
								{showRoutingNumber ? (
									<p className=''>{bankAccount.routing_number}</p>
								) : (
									<p className=''>
										·····
										{bankAccount.routing_number?.slice(-4) ?? ''}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className='mt-2'>
						<p className='font-semibold text-xs text-right'>
							Confirm Account Number
							<span className='text-amber-900'>*</span>
						</p>
						<input
							{...accountNumberField}
							className='border border-amber-900 h-8 rounded-md text-xs px-2 w-full'
							placeholder={
								'Account number ending in ····' + (bankAccount.last_4 ?? '')
							}
							required
						/>
						{Boolean(formState.errors['account_number']?.message) && (
							<div className='mt-4'>
								<LiteFormFieldError
									fieldErrorMessage={
										formState.errors['account_number']?.message ?? ''
									}
								/>
							</div>
						)}
					</div>
					<div className='mt-2'>
						<p className='font-semibold text-xs text-right'>
							Confirm Account Owner Name
							<span className='text-amber-900'>*</span>
						</p>
						<input
							{...accountOwnerNameField}
							className='border border-amber-900 h-8 rounded-md text-xs px-2 w-full'
							placeholder={'Enter the name of the account holder ····'}
							required
						/>
						{Boolean(formState.errors['account_owner_name']?.message) && (
							<div className='mt-4'>
								<LiteFormFieldError
									fieldErrorMessage={
										formState.errors['account_owner_name']?.message ?? ''
									}
								/>
							</div>
						)}
					</div>
					<div className='mt-3.5 text-right space-x-2 items-center flex justify-end'>
						<button
							className='w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300'
							disabled={isTokenizeBankAccountRunning}
							type='button'
							onClick={handleToggleTokenizationForm}
						>
							<p className='font-normal text-xs'>Back</p>
						</button>
						<button
							className={cn(
								'w-fit text-center py-1.5 px-6 rounded-md border',
								isAccountNumberInputComplete ? 'bg-black' : 'bg-slate-500',
							)}
							type='submit'
							disabled={isTokenizeButtonDisabled}
						>
							<div>
								{isTokenizeFormSubmitting ? (
									<>
										<div className='flex items-center justify-center min-w-8'>
											<div
												className={cn(
													'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
													'border-t-brand border-r-brand border-b-brand',
												)}
											></div>
										</div>
									</>
								) : (
									<p
										className={cn(
											'font-normal text-xs',
											isTokenizeButtonDisabled
												? 'text-slate-300'
												: 'text-white',
										)}
									>
										Save
									</p>
								)}
							</div>
						</button>
						{Boolean(formState.errors['root']?.message) && (
							<div className='mt-4'>
								<LiteFormFieldError
									fieldErrorMessage={formState.errors['root']?.message ?? ''}
								/>
							</div>
						)}
					</div>
				</form>
			</div>
			<div
				className={cn(
					'col-span-2 xl:col-span-1 flex items-center space-x-3 justify-end',
					showTokenizationForm ? 'hidden' : '',
				)}
			>
				{!isDefault && (
					<div>
						<button
							className='w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300'
							type='button'
							onClick={setBankAccountAsUserDefault}
							disabled={isMakeDefaultButtonDisabled}
						>
							{isUpdateUserRunning ? (
								<div>
									<div className='flex items-center justify-center min-w-8'>
										<div
											className={cn(
												'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
												'border-t-brand border-r-brand border-b-brand',
											)}
										></div>
									</div>
								</div>
							) : (
								<p className='font-normal text-xs'>Make Default</p>
							)}
						</button>
					</div>
				)}
				<div>
					<button
						className='w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300'
						type='button'
						onClick={handleToggleTokenizationForm}
					>
						<p className='font-normal text-xs'>Manage</p>
					</button>
				</div>
			</div>
		</div>
	);
}
