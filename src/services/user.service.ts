import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './base.service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const addUserTopics = async (data: { topics: string[] }) => {
	return await api.put('/users/add_topics', data);
};

export const getFeeds = async () => {
	return await api.get('/users/feeds');
};


export const getDashboardInfo = async () => {
	return await api.get('/users/dashboard');
};

export const getUserById = async (id: string) => {
	return await api.get(`/users/${id}`);
};

export const getSearchRequest = async (search_string: string) => {
	return await api.get(`/articles/search?search_string=${search_string}`);
};

// feeds tanstack query
export const useGetAllFeeds = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['feeds'],
		queryFn: () => getFeeds(),
	});

	const feeds = data?.data || [];

	return {
		feeds,
		isLoading,
		error,
	};
};



export const useGetDashboardInfo = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['dashboard'],
		queryFn: () => getDashboardInfo(),
	});

	const dashboard = data?.data || {};

	return {
		dashboard,
		isLoading,
		error,
	};
};

export const useGetUserById = (id: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['user', id],
		queryFn: () => getUserById(id),
	});

	const user = data?.data || {};

	return {
		user,
		isLoading,
		error,
	};
};


