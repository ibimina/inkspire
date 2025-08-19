import { AxiosError } from 'axios';
import api from './base.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';


// create article
export const createArticle = async (data: any) => {
    return await api.post('/articles', data);
};

// get article by id
export const getArticleById = async (id: string) => {
    return await api.get(`/articles/${id}`);
};

export const updateArticle = async ({ id, data }: { id: string, data: any }) => {
    return await api.patch(`/articles/${id}`, data);
};

export const postLikeRequest = async (article_id: string) => {
    return await api.post(`/articles/${article_id}/like`);
};

export const postCommentRequest = async ({ article_id, comment }: { article_id: string, comment: string }) => {
    return await api.post(`/articles/${article_id}/comment`, { comment });
};


export const useLikeArticle = (query: string) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: postLikeRequest,
		onSuccess: async (response) => {
			toast.success(response.data.message);
			queryClient.invalidateQueries({ queryKey: [query] });
		},
		onError: (error: AxiosError) => {
			toast.error('An error occurred'), console.error(error);
		},
	});
	return { mutate, isPending };
};

export const useGetArticleById = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['article', id],
        queryFn: () => getArticleById(id),
    });

    const article = data?.data || {};

    return {
        article,
        isLoading,
        error,
    };
};