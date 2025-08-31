import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import api from "@/lib/api";
import { User } from "./useUsers";

export function useDeleteUser(): UseMutationResult<number, Error, number, { previousUsers?: User[] }> {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number, { previousUsers?: User[] }>({
    mutationFn: async (id: number) => {
      await api.delete(`/users/${id}`);
      return id;
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      queryClient.setQueryData<User[]>(
        ["users"],
        previousUsers?.filter((u) => u.id !== id) ?? []
      );
      return { previousUsers };
    },
    onError: (_err, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });
}
