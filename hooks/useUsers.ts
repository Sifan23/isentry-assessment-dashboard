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
