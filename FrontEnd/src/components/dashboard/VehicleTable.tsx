import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Vehicle } from "@/types";

interface VehicleTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  onAction: (action: string, vehicleId: string) => void;
  getStatusColor: (status: string) => string;
}

const VehicleTable = ({
  vehicles,
  onAction,
  getStatusColor,
}: VehicleTableProps) => {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                No vehicles found
              </TableCell>
            </TableRow>
          ) : (
            vehicles?.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell className="font-medium">{vehicle.name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </TableCell>
                <TableCell>
                  {moment(vehicle.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onAction("edit", vehicle._id)}
                      >
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleTable;
