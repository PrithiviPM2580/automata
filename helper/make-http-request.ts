import { HTTPMethod } from "@/types"

export const makeHttpRequest = <T>(
  method: HTTPMethod,
  endpoint: string,
  input?: T
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/${endpoint}`,
        {
          method,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: input ? JSON.stringify(input) : undefined,
        }
      )

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
