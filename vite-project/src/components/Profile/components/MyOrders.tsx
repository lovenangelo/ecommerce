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
import { Button } from "@/components/ui/button";
import Invoice from "./Invoice";
type Order = {
  date: string; // You can use a more specific type for dates if needed (e.g., Date)
  price: number;
  order_id: number;
  status: string;
  transaction_number: string;
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

  if (ordersData.isLoading) return <Skeleton className="h-24 w-full" />;

  const processingTableRows = processingOrdersList.map((order, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">ORD00{order.order_id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>{order.price}</TableCell>
      <TableCell>
        <Invoice transaction_number={order.transaction_number} />
      </TableCell>
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
          <TableHead className="text-left sm:text-right">
            Transaction No.
          </TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-xs sm:text-sm">
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>
            <Button variant={"outline"} className="text-xs">
              TXN64d30d74c23182
            </Button>
          </TableCell>
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
      <TabsContent className="w-full wrap" value="processing">
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader className="text-xs sm:text-sm">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="sm:text-right">Transaction No.</TableHead>
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
