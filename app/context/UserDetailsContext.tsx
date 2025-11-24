import { createContext } from "react";

export const UserDetailContext = createContext<any>({
    userDetails : undefined,
    setUserDetail : () => { }

})