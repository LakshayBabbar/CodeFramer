import { useQuery } from "@tanstack/react-query";

const useFetch = (url: string, queryKey: string) => {
  const { isPending, error, isError, data, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async ({ signal }) => {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Something went wrong!");
      }
      return responseData;
    },
    retry: false
  });

  return { data, isError, error, loading: isPending, refetch };
};

export default useFetch;
