import { getVehicles } from "@/services/apiVehicles";
import { useQuery } from "@tanstack/react-query";

function useGetVehicles({ page, sort, limit, filter }) {
  const { isLoading, data } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehicles({ page, sort, limit, filter }),
  });

  return { isLoading, vehicles: data?.vehicles || [], total: data?.total || 0 };
}

export default useGetVehicles;
