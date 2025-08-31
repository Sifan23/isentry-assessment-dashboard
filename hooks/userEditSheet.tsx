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
  readOnly?: boolean;
};

export default function UserEditSheet({ user, open, onClose,readOnly }: Props) {
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
          <SheetTitle>{readOnly ? "View User" : "Edit User"}</SheetTitle>
          <SheetDescription>
            {readOnly
              ? "View the user details."
              : "Update the user details and save changes."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >
          {["name", "username", "email", "phone", "website", "company", "city"].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                {...register(field as keyof FormData)}
                disabled={readOnly} // ✅ disable input in read-only mode
              />
              {!readOnly && errors[field as keyof FormData] && (
                <p className="text-red-500 text-sm">
                  {errors[field as keyof FormData]?.message as string}
                </p>
              )}
            </div>
          ))}
        </form>

        {!readOnly && (
          <SheetFooter className="px-4 pb-4">
            <Button
              onClick={handleSubmit((data) => mutation.mutate(data))}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
