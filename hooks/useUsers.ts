// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
};

async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// Update user mutation 
async function updateUser(user: User): Promise<User> {
  const { data } = await api.put<User>(`/users/${user.id}`, user);
  return data;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // Optimistically update cache
      queryClient.setQueryData<User[]>(["users"], (oldUsers = []) =>
        oldUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>({
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
    onError: (_err, _id, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });
}


