import {
  useQuery as useReactQuery,
  useMutation as useReactMutation,
  MutationKey,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

export type QueryKey = unknown[];

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function useQuery<TData>(queryKey: QueryKey, endpoint: string) {
  const queryFn = async () => {
    const response = await fetch(endpoint);

    if (!response.ok) {
      const error = new ApiError(response.status, response.statusText);
      throw error;
    }

    return await response.json();
  };

  const query = useReactQuery<TData>(queryKey, queryFn);

  if (query.error && query.error instanceof ApiError) {
    toast.error(
      `Failed to fetch data: ${query.error.status} ${query.error.message}`
    );
  }

  return query;
}

export function useMutation<TData, TPayload>(
  mutationKey: MutationKey,
  endpoint: string,
  method: Method = Method.POST
) {
  const mutationFn = async (payload: TPayload) => {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = new ApiError(response.status, response.statusText);
      throw error;
    }

    return response.json() as Promise<TData>;
  };

  const mutation = useReactMutation<TData, ApiError, TPayload>({
    mutationKey,
    mutationFn,
    onError: (error: ApiError) => {
      toast.error(`Failed to mutate data: ${error}`);
    },
    onSuccess: () => {
      toast.success("Success!");
    },
  });

  return mutation;
}
