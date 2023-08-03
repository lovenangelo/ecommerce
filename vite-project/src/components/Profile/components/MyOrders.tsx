import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "react-query";
import { getOrders } from "@/components/Cart/Checkout/checkout-api";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Order = {
  date: string; // You can use a more specific type for dates if needed (e.g., Date)
  price: number;
  order_id: number;
  status: string;
};

const MyOrders = () => {
  const [processingOrdersList, setProcessingOrdersList] = useState<
    [] | Order[]
  >([]);
  const orders = async () => await getOrders();

  const ordersData = useQuery(["get-orders"], orders, {
    retry: 2,
    enabled: true,
    onSuccess(data) {
      setProcessingOrdersList(data?.data ?? []);
    },
  });

  console.log(ordersData);
  if (ordersData.isLoading) return <Skeleton className="h-24 w-full" />;

  const processingTableRows = processingOrdersList.map((order, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">ORD00{order.order_id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>{order.price}</TableCell>
      <TableCell className="text-right">{order.status}</TableCell>
    </TableRow>
  ));

  const table = (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader className="text-xs sm:text-sm">
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-xs sm:text-sm">
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <Tabs defaultValue="processing" className="w-full lg:w-3/4">
      <TabsList className={cn("space-x-2")}>
        <TabsTrigger value="processing">Processing</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>
      <TabsContent value="processing">
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader className="text-xs sm:text-sm">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs sm:text-sm">
            {processingTableRows}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="completed">{table}</TabsContent>
      <TabsContent value="cancelled">{table}</TabsContent>
    </Tabs>
  );
};

export default MyOrders;
