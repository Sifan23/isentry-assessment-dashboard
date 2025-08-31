"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { User } from "@/hooks/useUsers";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  website: yup.string().required("Website is required"),
  company: yup.string().required("Company name is required"),
  city: yup.string().required("City is required"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  user: User | null;
  open: boolean;
  onClose: () => void;
};

export default function UserEditSheet({ user, open, onClose }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: user.company?.name || "",
          city: user.address?.city || "",
        }
      : {},
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.put(`/users/${user?.id}`, {
        ...data,
        company: { name: data.company },
        address: { city: data.city },
      });
      return res.data;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) =>
        oldData?.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      onClose();
    },
  });

  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            Update the user details and save changes.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >

          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" {...register("website")} />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company")} />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
        </form>

        <SheetFooter className="px-4 pb-4">
          <Button
            onClick={handleSubmit((data) => mutation.mutate(data))}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
