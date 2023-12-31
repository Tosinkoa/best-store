import Layout from "@/components/Layouts/Layout";
import store from "@/store/store";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Open_Sans } from "next/font/google";
import { Provider } from "react-redux";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-openSans",
});

export default function App({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => <Layout children={page} />);

  return (
    <Provider store={store}>
      {getLayout(
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
            pageExit: {
              opacity: 0,
            },
          }}
        >
          <main className={`${openSans.variable}`}>
            <Component {...pageProps} />
          </main>
        </motion.div>
      )}
    </Provider>
  );
}
