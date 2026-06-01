import User from "@/models/user"

export interface UserData {
  id: string
  name: string
  email: string
  image: string
  accessToken?: string
  refreshToken?: string
}

export class UserService {
  private static instance: UserService

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async createUser(userData: UserData) {
    const { id, name, email, image, accessToken, refreshToken } = userData

    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
      const user = new User({
        name,
        email,
        image,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
        googleId: id,
      })

      const newUser = await user.save()

      return {
        authData: {
          ...newUser.toObject(),
        },
      }
    } else {
      const user = await User.findByIdAndUpdate(
        existingUser?._id,
        {
          googleAccessToken: accessToken,
          googleRefreshToken: refreshToken,
        },
        { new: true, runValidators: true }
      )

      return {
        authData: {
          ...user?.toObject(),
        },
      }
    }
  }
}
