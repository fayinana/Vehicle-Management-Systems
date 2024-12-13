import { addVehicle as addVehiclesApi } from "@/services/apiVehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useAddVehicle() {
  const queryClient = useQueryClient();
  const { isPending: isAdding, mutate: addVehicle } = useMutation({
    mutationFn: addVehiclesApi,
    mutationKey: ["vehicles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      toast.success("Vehicle added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isAdding, addVehicle };
}

export default useAddVehicle;
