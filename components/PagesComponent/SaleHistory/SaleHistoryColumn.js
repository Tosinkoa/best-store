import Image from "next/legacy/image";
import NumberFormatter from "@/components/01Utils/NumberFormatter";
import ProductDetail from "./ProductDetail";
import dayjs from "dayjs";

export const SaleHistoryColumn = [
  {
    id: "product_image",
    Header: "",
    accessor: (d) => {
      return (
        <div className=" block">
          <div className="relative h-[60px] w-[60px] rounded-full ">
            <Image
              src={d.images[0].image_url}
              alt="product-picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      );
    },
  },
  {
    id: "product",
    Header: "Product",
    accessor: "product",
  },
  {
    id: "count",
    Header: "Count",
    accessor: "product_count",
  },
  {
    id: "buyer",
    Header: "Buyer",
    accessor: (d) => `${d.buyer_first_name} ${d.buyer_last_name}`,
  },
  {
    id: "price",
    Header: "Price",
    accessor: (d) => `₦${NumberFormatter(d.amount)}`,
  },
  {
    id: "date",
    Header: "Date",
    accessor: (d) => `${dayjs(d.date_purchased).format("MMM DD, YYYY")}`,
  },
  {
    id: "view",
    Header: " ",
    accessor: (d) => {
      return <ProductDetail eachSalesHistoryData={d} />;
    },
  },
];
