const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDM4MTk4QkUzYTcxMjZBRkE5NkZBRjgxZTUxMzZjNzlFNTZhRWQzYmQiLCJwdWJsaWNBZGRyZXNzIjoiMHgzODE5OEJFM2E3MTI2QUZBOTZGQUY4MWU1MTM2Yzc5RTU2YUVkM2JkIiwiZW1haWwiOiJheXVzaDIwMDRuYW1kZXZAZ21haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsIndhbGxldHMiOltdLCJpYXQiOjE2ODI1NjUyNDMsImV4cCI6MTY4MzE3MDA0MywiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4MzgxOThCRTNhNzEyNkFGQTk2RkFGODFlNTEzNmM3OUU1NmFFZDNiZCJ9fQ.rEsP_W-AkpYBRwcM5jH4DLRfm_CQ4z6-LHAJxjx-Hek"
async function queryHasuraGQL(operationsDoc, operationName, variables , token) {
    const result = await fetch(
      process.env.NEXT_PUBLIC_HASURA_URL,
      {
        method: "POST",
        headers : {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
  
    return await result.json();
  }
  
 
  
  function fetchMyQuery() {
    const operationsDoc = `
    query MyQuery {
      users {
        id
        issuer
        publicAdddress
        email
      }
    }`
    return queryHasuraGQL(operationsDoc , "MyQuery",  {} )
  }
  
export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
  
  startFetchMyQuery();