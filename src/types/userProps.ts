import { Dispatch, SetStateAction } from "react";
import { User } from "./user";

export interface UserProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
