import { editVehicle as editVehiclesApi } from "@/services/apiVehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditVehicle() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editVehicle } = useMutation({
    mutationFn: editVehiclesApi,
    mutationKey: ["vehicles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
    onError: (error) => {
      console.log("success");
    },
  });

  return { isEditing, editVehicle };
}

export default useEditVehicle;
