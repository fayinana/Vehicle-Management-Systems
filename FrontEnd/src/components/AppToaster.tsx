import { Toaster, ToastOptions } from "react-hot-toast";

const toasterOptions: ToastOptions = {
  duration: 3000,
  className:
    "font-sans text-base max-w-lg p-2 bg-gray-50 text-gray-700 rounded shadow-lg",
};

const AppToaster = () => (
  <Toaster
    position="bottom-right"
    gutter={12}
    containerStyle={{
      margin: "6px",
    }}
    toastOptions={{
      success: toasterOptions,
      error: { ...toasterOptions, duration: 5000 },
    }}
  />
);

export default AppToaster;
