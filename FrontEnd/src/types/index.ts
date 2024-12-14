export interface Vehicle {
  _id?: string;
  name: string;
  status: "Active" | "Inactive" | "Maintenance";
  updatedAt?: string;
}
