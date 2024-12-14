import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/types";
import { useForm } from "react-hook-form";
import useAddVehicle from "@/hooks/useAddVehicle";

const AddVehicle = () => {
  const navigate = useNavigate();
  const { isAdding, addVehicle } = useAddVehicle();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Vehicle>();

  const onSubmit = async (data: Vehicle) => {
    addVehicle(data);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Vehicle Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter vehicle name"
                  {...register("name", {
                    required: "Vehicle name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="mt-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm appearance-none"
                >
                  <option
                    value="Active"
                    className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Active
                  </option>
                  <option
                    value="Maintenance"
                    className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Maintenance
                  </option>
                  <option
                    value="Inactive"
                    className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Inactive
                  </option>
                </select>
                {errors.status && (
                  <p className="text-red-600 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    "Add Vehicle"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddVehicle;
