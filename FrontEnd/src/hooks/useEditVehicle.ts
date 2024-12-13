import { editVehicle as editVehiclesApi } from "@/services/apiVehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditVehicle() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editVehicle } = useMutation({
    mutationFn: editVehiclesApi,
    mutationKey: ["vehicles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
      toast.success("Vehicle status changed successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, editVehicle };
}

export default useEditVehicle;
