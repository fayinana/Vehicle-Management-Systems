import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBarChart from "@/components/dashboard/StatusBarChart";
import StatusPieChart from "@/components/dashboard/StatusPieChart";
import VehicleTable from "@/components/dashboard/VehicleTable";
import { Vehicle } from "@/types";
import EditVehicleModal from "@/components/EditVehicleModal";
import useGetVehicles from "@/hooks/useGetVehicles";
import Spinner from "@/components/Spinner";

const Index = () => {
  const { vehicles, isLoading } = useGetVehicles();
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState("week");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const getStatusCounts = () => {
    const counts = {
      Active: 0,
      Maintenance: 0,
      Inactive: 0,
    };
    vehicles?.forEach((vehicle) => {
      counts[vehicle.status as keyof typeof counts]++;
    });
    return Object.entries(counts).map(([status, count]) => ({
      status,
      count,
    }));
  };

  const filteredVehicles = vehicles?.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "inactive":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const handleAction = (action: string, vehicleId: string) => {
    const vehicle = vehicles?.find((v) => v._id === vehicleId);
    setEditModalOpen(true);
    setSelectedVehicle(vehicle);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Vehicles Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
          </div>
        </div>
        {!isLoading ? (
          <>
            <VehicleTable
              vehicles={filteredVehicles || []}
              isLoading={isLoading}
              onAction={handleAction}
              getStatusColor={getStatusColor}
            />
            <div className="grid gap-4 md:grid-cols-2 mt-8">
              <StatusBarChart data={getStatusCounts()} />
              <StatusPieChart data={getStatusCounts()} />
            </div>
            {isEditModalOpen && selectedVehicle && (
              <EditVehicleModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                vehicle={selectedVehicle}
              />
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </Layout>
  );
};

export default Index;
