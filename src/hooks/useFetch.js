import { useQuery } from "@tanstack/react-query";

const useFetch = (url, queryKey) => {
  const { isPending, error, isError, data, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        console.error("Fetch Error: ", err.message);
        throw err;
      }
    },
  });

  return { data, isError, error, loading: isPending, refetch };
};

export default useFetch;
