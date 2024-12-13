import { Vehicle } from "@/types";
import * as React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useEditVehicle from "@/hooks/useEditVehicle";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
}

const EditVehicleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  vehicle,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ status: string }>({
    defaultValues: { status: vehicle?.status || "Active" },
  });
  const { isEditing, editVehicle } = useEditVehicle();

  React.useEffect(() => {
    if (vehicle) {
      setValue("status", vehicle.status);
    }
  }, [vehicle, setValue]);

  function onSubmit(data: { status: string }) {
    editVehicle({ data: data.status, id: vehicle._id });
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Edit Vehicle Status
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-600 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  test-data-id="cancel"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                  disabled={isEditing}
                >
                  {!isEditing ? "Save" : "Saving..."}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditVehicleModal;
