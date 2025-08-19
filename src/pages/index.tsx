import Link from 'next/link';
import styles from '../styles/index.module.css';
import { useGoogleSignin, useGitHubSignin } from '@/hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';
import RegistrationLayout from '@/container/registerlayout';
import { ShowPassword } from '@/components';
import { LoginType, loginSchema } from '@/validations/auth.validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { AxiosError } from 'axios';
import { toast } from "sonner";
import { login } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';


export default function Home() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: '',
			password: '',
		},
	});


	const { google } = useGoogleSignin();
	const { github } = useGitHubSignin()
	const handleGithubLogin = async (e: React.MouseEvent) => {
		e.preventDefault()
		await github();
	};
	const handleGoogleLogin = async (e: React.MouseEvent) => {
		e.preventDefault()
		await google();
	};

	const { mutate, isPending } = useMutation({
		mutationFn: login,
		onSuccess: async (response) => {
			const { access_token } = response?.data;
			sessionStorage.setItem("access_token", access_token);
			toast.success("Login Success");
			router.push("/chatter");
		},
		onError: (error: AxiosError) => {
			toast.error("Login Failed", {
				description: typeof error?.response?.data === "string"
					? error.response.data
					: (error?.message || "An error occurred"),
			});

		},
	});

	const onSubmit = (data: LoginType) => {
		const formData = new FormData();
		formData.append('username', data.email);
		formData.append('password', data.password);
		console.log(formData)
		mutate(formData)
	}

	return (
		<>
			<Head>
				<title>Log in on InkSpire</title>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="IE=7" />
				<meta name="description" content="Log in to your account" />
			</Head>

			<RegistrationLayout>
				<div className='mt-20 lg:w-3/5 lg:m-auto md:mt-0 '>
					<div
						className={`pb-2 flex flex-col justify-center`}>
						<div className={`mb-8`}>
							<p className={`font-semibold text-3xl mb-2`}>Welcome back</p>
							<p className={`text-base  text-slate-400`}>
								Let&apos;s get you logged in so you can jump right back into
								sharing your brilliant ideas and engaging stories{' '}
							</p>
						</div>
						<form className={` mb-10`} onSubmit={handleSubmit(onSubmit)}>
							<InputErrorWrapper error={errors.email?.message}>
								<label className={`block mb-4`}>
									<input
										type='email'
										placeholder='Enter your email'
										{...register('email')}
										required
										className={`outline-none block w-full p-2 border-solid border-2 border-black rounded-lg`}
									/>
								</label>
							</InputErrorWrapper>


							<InputErrorWrapper error={errors.password?.message}>
								<label className={`block mb-3 relative`}>
									<input
										type='password'
										placeholder='Enter your password'
										{...register('password')}
										className={`outline-none block w-full p-2 border-solid border-2 border-black rounded-lg`}
									/>
									<ShowPassword />
								</label>
							</InputErrorWrapper>

							<Link
								href='forgotpassword'
								className={`block text-right mb-8 text-violet-700`}>
								forgot password
							</Link>
							<button
								disabled={isPending}
								type='submit'
								className={`cursor-pointer mb-2 flex items-center justify-center w-full p-2 bg-violet-700 text-white rounded-lg hover:bg-black hover:text-white ${isPending && 'opacity-50'}}`}
							>
								Log in {isPending && <Loader2 className="animate-spin"/>}
							</button>
							<p className={`text-center`}>
								Don&apos;t have an account?{' '}
								<Link href='signup' className='text-violet-700'>Create one</Link>{' '}
							</p>
						</form>
						<p className={`mb-7`}>or continue with ______________</p>
						<div className={`flex items-center justify-center gap-4`}>
							<button
								onClick={handleGoogleLogin}
								className={`${styles.loginBtn}  ${styles.googleBtn} focus:border-solid hover:border-dashed rounded-full`}
								aria-label='google login button'
							></button>
							<button
								onClick={handleGithubLogin}
								className={`${styles.loginBtn}  ${styles.githubBtn} focus:border-solid hover:border-dashed rounded-full`}
								aria-label='github login button'
							></button>
						</div>
					</div>
				</div>
			</RegistrationLayout>
		</>
	);
}
