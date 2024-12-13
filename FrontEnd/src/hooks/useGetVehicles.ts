import { getVehicles } from "@/services/apiVehicles";
import { useQuery } from "@tanstack/react-query";

function useGetVehicles() {
  const { isLoading, data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  return { isLoading, vehicles };
}

export default useGetVehicles;
