import {mAdmin} from "../../lib/magic-server"
import jwt from "jsonwebtoken";

export default async function login(req,res){
    if(req.method === "POST"){
        try{
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substr(7) : "";
            const metadata = await mAdmin.users.getMetadataByToken(didToken)
            console.log({ metadata });
            const token = jwt.sign({
                ...metadata,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": `${metadata.issuer}`,
          },
            } , "thisIsASecretthisIsASecret123412" )

            console.log(token)

            res.send({done : true})
        }
        catch(err){
            console.log(err)
            res.status(500).send({done : false})
        }
    }
    else{
        res.send({done : false})
    }
}