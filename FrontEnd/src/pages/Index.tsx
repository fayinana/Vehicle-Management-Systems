import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VehicleTable from "@/components/dashboard/VehicleTable";
import { Vehicle } from "@/types";
import EditVehicleModal from "@/components/EditVehicleModal";
import useGetVehicles from "@/hooks/useGetVehicles";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import StatusBarChart from "@/components/dashboard/StatusBarChart";
import StatusPieChart from "@/components/dashboard/StatusPieChart";
import { useQueryClient } from "@tanstack/react-query";
import { getVehicles } from "@/services/apiVehicles";

const Index = () => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "-name";
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "all";
  const [searchInput, setSearchInput] = useState(search);

  const { vehicles, total, isLoading } = useGetVehicles({
    limit,
    page: currentPage,
    sort,
    filter: filter === "all" ? null : filter,
  });

  const totalPages = Math.ceil(total / limit) || 1;

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      setSearchParams({
        page: "1",
        limit: limit.toString(),
        sort,
        search,
        filter,
      });
    }
  }, [currentPage, totalPages, limit, sort, search, setSearchParams, filter]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["vehicles"] });
  }, [currentPage, limit, search, sort, queryClient, filter]);

  const handleLimitChange = (value) => {
    setSearchParams({ page: "1", limit: value, sort, search, filter });
  };

  const handleSortChange = (value) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort: value,
      search,
      filter,
    });
  };

  const handleFilter = (value: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort,
      search,
      filter: value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort,
      filter,
      search: searchInput,
    });
  };

  const { vehicles: allVehicles, isLoading: isLoadingAll } = useGetVehicles({
    limit: null,
    page: null,
    sort: null,
    filter: null,
  });

  useEffect(() => {
    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["vehicles", currentPage + 1, limit, sort, search, filter],
        queryFn: () =>
          getVehicles({
            page: currentPage + 1,
            limit,
            sort,
            filter: filter === "all" ? null : filter,
          }),
      });
    }

    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ["vehicles", currentPage - 1, limit, sort, search, filter],
        queryFn: () =>
          getVehicles({
            page: currentPage - 1,
            limit,
            sort,
            filter: filter === "all" ? null : filter,
          }),
      });
    }
  }, [currentPage, limit, sort, search, filter, queryClient, totalPages]);

  if (isLoadingAll || isLoading) return <Spinner />;

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getStatusCounts = () => {
    const counts = { Active: 0, Maintenance: 0, Inactive: 0 };
    allVehicles.forEach((vehicle) => {
      counts[vehicle.status as keyof typeof counts]++;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({
        page: newPage.toString(),
        limit: limit.toString(),
        sort,
        search,
        filter,
      });
    }
  };

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Vehicles Dashboard
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={String(limit)} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Set A Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="-name">Name (Z-A)</SelectItem>
                <SelectItem value="-updatedAt">Date Added (Newest)</SelectItem>
                <SelectItem value="updatedAt">Date Added (Oldest)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter} onValueChange={handleFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vehicles..."
                value={searchInput}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {!isLoading ? (
          <>
            <VehicleTable
              vehicles={filteredVehicles}
              isLoading={isLoading}
              onAction={(action, vehicleId) => {
                const vehicle = vehicles?.find((v) => v._id === vehicleId);
                setEditModalOpen(true);
                setSelectedVehicle(vehicle);
              }}
              getStatusColor={getStatusColor}
            />
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

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
