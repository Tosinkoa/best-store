import Image from "next/legacy/image";
import NumberFormatter from "@/components/01-Utils/NumberFormatter";
import ProductDetail from "./ProductDetail";

export const SaleHistoryColumn = [
  {
    id: "product_image",
    Header: "",
    accessor: (d) => {
      return (
        <div className=" block">
          <div className="relative h-[60px] w-[60px] rounded-full ">
            <Image
              src="https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipados14_widgets_062220_big.jpg.large.jpg"
              alt="archware-teanant-picture"
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
    accessor: (d) => <p className="flex whitespace-nowrap capitalize">{d.product}</p>,
  },
  {
    id: "buyer",
    Header: "Buyer",
    accessor: (d) => <p className="flex whitespace-nowrap capitalize">John Den</p>,
  },
  {
    id: "price",
    Header: "Price",
    accessor: (d) => <p>{NumberFormatter(7800)}</p>,
  },
  {
    id: "date",
    Header: "Date",
    accessor: (d) => <p className="flex whitespace-nowrap">20 Jan, 2021</p>,
  },
  {
    id: "view",
    Header: " ",
    accessor: (d) => {
      return <ProductDetail />;
    },
  },
];
