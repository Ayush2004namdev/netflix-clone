import { Magic } from "magic-sdk";
 
const magicFun = () => {
    return(
        typeof Window !== "undefined" && new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)
    )
}

export const magic = magicFun()
