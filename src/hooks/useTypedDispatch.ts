import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/data/store";

const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
