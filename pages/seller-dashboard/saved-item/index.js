import { getLayout } from "@/components/Layouts/SellerDashboardLayout";
import ProductList from "@/components/GeneralComponent/ProductList";

const SaveItem = () => {
  return <ProductList />;
};

SaveItem.getLayout = getLayout;
export default SaveItem;
