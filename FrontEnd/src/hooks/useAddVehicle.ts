import { addVehicle as addVehiclesApi } from "@/services/apiVehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddVehicle() {
  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate: addVehicle } = useMutation({
    mutationFn: addVehiclesApi,
    mutationKey: ["vehicles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
    onError: (error) => {
      console.log("success");
    },
  });

  return { isAdding, addVehicle };
}

export default useAddVehicle;
