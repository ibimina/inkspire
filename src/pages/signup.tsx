import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/signup.module.css';
import RegistrationLayout from '@/container/registerlayout';
import { ShowPassword } from '@/components';
import { ISignUp } from '@/interfaces/auth.interface';
import { signUpSchema } from '@/validations/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { signUp } from '@/services/auth.service';
import { AxiosError } from 'axios';
import { toast } from "sonner";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

function SignUp() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUp>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: '',
			password: '',
			username: "",
			confirm_password: ""
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: signUp,
		onSuccess: (response) => {
			const { access_token } = response?.data;
			sessionStorage.setItem("access_token", access_token);
			toast.success("Account Created", {
				description:"Account Created Successfully",
			});
			router.push("/add-topics")
		},
		onError: (error: AxiosError) => {
			toast.error("Account Creation Failed", {
				description: typeof error?.response?.data === "string"
					? error.response.data
					: (error?.message || "An error occurred"),
			});
		},
	});

	const onSubmit = (data: ISignUp) => {
		mutate({
			username: data.username,
			email: data.email,
			password: data.password,
		})
	};

	return (
		<>
			<Head>
				<title>Sign up on InkSpire</title>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="IE=7" />
				<meta name="description" content="Create a account on InkSpire" />
			</Head>
			<RegistrationLayout>
				<div
					className={`lg:w-3/5 lg:m-auto flex flex-col justify-center`}
				>
					<div className={`mb-8`}>
						<p className={`font-semibold text-3xl mb-2`}>
							Create your account
						</p>
						<p className={`text-base  text-slate-400`}>
							Start crafting compelling blog posts that engage and captivate
							readers from the very beginning.{' '}
						</p>
					</div>
					<form className={`mb-10`} onSubmit={handleSubmit(onSubmit)}>
						<InputErrorWrapper error={errors.username?.message}>

							<label className={`block mb-4`}>
								<input
									type='text'
									required
									placeholder='Enter your username'
									{...register("username")}
									className={`outline-none block w-full p-2 border-solid border-2 border-black rounded-lg`}
								/>

							</label>
						</InputErrorWrapper>
						<InputErrorWrapper error={errors.email?.message}>

							<label className={`block mb-4`}>
								<input
									type='email'
									placeholder='Enter your email'
									required
									{...register("email")}
									className={`outline-none block w-full p-2 border-solid border-2 border-black rounded-lg`}
								/>
							</label>
						</InputErrorWrapper>
						<InputErrorWrapper error={errors.password?.message}>

							<label className={`block mb-3 relative`}>

								<input
									type='password'
									required
									{...register("password")}
									placeholder='Enter your password'
									className={`outline-none block w-full p-2 border-solid border-2 border-black rounded-lg`}
								/>
								<ShowPassword />
							</label>
						</InputErrorWrapper>
						<InputErrorWrapper error={errors.confirm_password?.message}>

							<label className={`block mb-3 relative`}>

								<input
									type='password'
									required
									{...register("confirm_password")}
									placeholder='Confirm your password'
									className={`outline-none block w-full p-2 border-solid border-2 border-black rounded-lg`}
								/>
								<ShowPassword />
							</label>
						</InputErrorWrapper>
						<input
							type='submit'
							value='Sign Up'
							className={`cursor-pointer mt-10 block w-full p-2 bg-violet-700 text-white rounded-lg hover:bg-black hover:text-white ${isPending ? styles.grey : ''
								} `}
							disabled={isPending}
						/>
						<p className={` text-center`}>
							Already have an account? <Link href='/'>Log in</Link>{' '}
						</p>
					</form>
				</div>
			</RegistrationLayout>

		</>
	);
}

export default SignUp;
