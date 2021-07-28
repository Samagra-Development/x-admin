import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider
      autoDismiss={true}
      autoDismissTimeout={4000}
      placement="bottom-center"
    >
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ToastProvider>
  );
}

export default MyApp;
