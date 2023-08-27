import { getLayout } from "@/components/Layouts/DashboardLayout";
import ProductList from "@/components/GeneralComponent/ProductList";

const Product = () => <ProductList />;

Product.getLayout = getLayout;
export default Product;
