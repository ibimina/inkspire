import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
	createArticle,
	getArticleById,
	updateArticle,
} from '@/services/article.service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

function useEditor() {
	const router = useRouter();
	const id = router.query.id;
	const [unsplashSearch, setUnsplashSearch] = useState<string>('Inspiration');
	const [isUnsplashVisible, setIsUnsplashVisible] = useState<boolean>(false);
	const [isvisible, setIsVisible] = useState<boolean>(false);
	const [isPublishing, setIsPublishing] = useState<boolean>(false);
	const [isDiasbled, setIsDisabled] = useState<boolean>(false);
	const [articleDetails, setArticleDetails] = useState({
		title: '',
		subtitle: '',
		cover_image: '',
		content: '',
		topics: [] as string[],
		is_published: false,
	});
	const getUnsplashTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUnsplashSearch(e.target.value.trim());
	};
	const insertMarkdown = (markdownSyntax: string) => {
		const textarea = document.getElementById(
			'markdownTextarea'
		) as HTMLTextAreaElement;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = textarea.value;
		const before = text.substring(0, start);
		const after = text.substring(end, text.length);
		textarea.value = before + markdownSyntax + after;
		setArticleDetails({ ...articleDetails, content: textarea.value });
		textarea.focus();
	};
	const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setArticleDetails({ ...articleDetails, [e.target.name]: e.target.value });
	};
	const toggleVisible = () => {
		setIsVisible(!isvisible);
	};
	const togglePublishing = () => {
		setIsPublishing(!isPublishing);
	};
	const { mutate } = useMutation({
		mutationFn: getArticleById,
		onSuccess: async (response) => {
			setArticleDetails({
				...response?.data,
				topics: response?.data?.topic?.map(
					(topic: { title: string }) => topic.title
				),
			});
			toast.success('Article fetched successfully');
		},
		onError: (error: AxiosError) => {
			toast.error('Failed to fetch article');
		},
	});

	useEffect(() => {
		if (id) return mutate(id as string);
	}, [id]);

	const { mutate: handleCreateArticle, isPending } = useMutation({
		mutationFn: createArticle,
		onSuccess: async (response) => {
			router.push(`/article/${response.data.id}`);

			toast.success('Article fetched successfully');
			return;
		},
		onError: (error: AxiosError) => {
			toast.error('Failed to fetch article');
		},
	});

	const { mutate: handleEditArticle, isPending: isEditing } = useMutation({
		mutationFn: updateArticle,
		onSuccess: async (response) => {
			router.push(`/article/${response.data.id}`);
			return;
		},
		onError: (error: AxiosError) => {
			toast.error('Failed to fetch article');
		},
	});

	const publishArticle = (e: React.MouseEvent) => {
		e.preventDefault();
		if (articleDetails.title.trim() === '') {
			toast.error('Looks like you forgot to add a title');
		} else if (articleDetails.title.trim().length < 9) {
			return toast.error('Title is too short');
		} else if (
			articleDetails.content.trim().length > 9 &&
			articleDetails.title.trim() !== ''
		) {
			setIsDisabled(true);
			const words = articleDetails.content.trim().split(/\s+/).length;
			const time = Math.ceil(words / 225);
			handleCreateArticle({
				...articleDetails,
				is_published: true,
				reading_time: time,
			});
		}
	};

	const updateArticleInFirebase = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (articleDetails.title.trim() === '') {
			toast.error('Looks like you forgot to add a title');
		} else if (articleDetails.title.trim().length < 9) {
			return toast.error('Title is too short');
		} else if (
			articleDetails.content.trim().length > 9 &&
			articleDetails.title.trim() !== ''
		) {
			setIsDisabled(true);
			const words = articleDetails.content.trim().split(/\s+/).length;
			const time = Math.ceil(words / 225);
			handleEditArticle({
				id: id as string,
				data: {
					title: articleDetails?.title.trim(),
					subtitle: articleDetails?.subtitle?.trim() ?? "",
					content: articleDetails?.content.trim(),
					topics: articleDetails?.topics,
					cover_image: articleDetails?.cover_image.trim(),
					is_published: true,
					reading_time: time,
				},
			});
		}
	};

	const addTag = (e: React.FormEvent) => {
		e.preventDefault();
		let forms = e.currentTarget as HTMLFormElement;
		let topic = (e.currentTarget.childNodes[0] as HTMLInputElement).value;
		if (topic.trim() !== '' && articleDetails?.topics?.length < 5) {
			setArticleDetails({
				...articleDetails,
				topics: [...articleDetails?.topics, topic],
			});
			forms.reset();
		}
	};
	const removeTag = (topic: string) => {
		setArticleDetails({
			...articleDetails,
			topics: articleDetails.topics.filter((t: string) => t !== topic),
		});
	};
	const getUnSplashUrl = (url: string) => {
		toggleUnsplash();
		setArticleDetails({ ...articleDetails, cover_image: url });
	};

	const toggleUnsplash = () => {
		setIsUnsplashVisible(!isUnsplashVisible);
	};

	const autoSaveDraft = async () => {
		if (
			articleDetails?.content?.trim() !== '' &&
			articleDetails?.is_published === false
		) {
			const words = articleDetails?.content?.trim().split(/\s+/).length;
			const time = Math.ceil(words / 225);
			handleCreateArticle({
				...articleDetails,
				is_published: false,
				reading_time: time,
			});
		}
	};

	const changeRoute = async (route: string) => {
		await autoSaveDraft();
		router.push(`/${route}`);
	};
	return {
		changeRoute,
		articleDetails,
		handleValueChange,
		isvisible,
		toggleVisible,
		updateArticleInFirebase,
		publishArticle,
		getUnsplashTerm,
		getUnSplashUrl,
		isUnsplashVisible,
		toggleUnsplash,
		unsplashSearch,
		insertMarkdown,
		isPublishing,
		togglePublishing,
		addTag,
		removeTag,
		isDiasbled,
	};
}

export default useEditor;
