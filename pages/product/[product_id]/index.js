import { getLayout } from "@/components/Layouts/DashboardLayout";
import ViewOneProductComponent from "@/components/SellerComponent/Product/ViewOneProductComponent";

const ViewProduct = () => {
  return (
    <div className="mx-auto w-[95%] md:h-[80vh] mt-4">
      <ViewOneProductComponent />
    </div>
  );
};

ViewProduct.getLayout = getLayout;

export default ViewProduct;
