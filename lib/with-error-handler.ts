import dbConnect from "@/config/db"

export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(
  handler: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (async (...args: Parameters<T>) => {
    try {
      await dbConnect()
      return await handler(...args)
    } catch (error) {
      console.error(error)
      throw new Error("Internal Server Error")
    }
  }) as (...args: Parameters<T>) => ReturnType<T>
}
