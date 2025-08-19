import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./base.service";
import { AxiosError } from "axios";

export const getTopics = async () => {
  return await api.get("/topics");
};

export const addUserTopicsReq = async (topic_id: string) => {
  return await api.post(`/topics/follow/${topic_id}`);
};

export const getTopicByTitle = async (title: string) => {
  return await api.get(`/topics/${title}`);
};

export const useGetTopicByTitle = (title: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topic", title],
    queryFn: () => getTopicByTitle(title),
  });

  const topic = data?.data || {};
  return {
    topic,
    isLoading,
    error,
  };
}
export const useAddUserTopics = () => {
    const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: addUserTopicsReq,
    onSuccess: async () => {
      // Optionally handle success
      			queryClient.invalidateQueries({ queryKey: ['dashboard'] });

    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  return { mutate, isPending };
};

export const useGetAllTopics = () => {
  const { data, isLoading, error  } = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(),

  });

  const topics = data?.data || [];

  return {
    topics,
    isLoading,
    error,
  };
};