const Layout = ({ children }) => {
  return <div className="text-sm md:text-base">{children}</div>;
};

export const getLayout = (page) => <Layout>{page}</Layout>;
export default Layout;
