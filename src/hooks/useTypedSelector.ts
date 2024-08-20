import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@/data/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
