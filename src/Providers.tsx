import { Provider } from "react-redux";
import store from "./data/store";

function Providers({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
