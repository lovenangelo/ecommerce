import axiosClient from "@/lib/axios";

export const createAddress = async (address: {
  fullname: string;
  mobile_number: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}) => {
  return await axiosClient.post("/api/order/address", address);
};
