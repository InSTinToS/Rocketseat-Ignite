import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import database from 'src/database'
import api from 'src/services/api'
import UserModel from 'src/database/models/User'

interface User extends ResUser {
  user_id: string
  token: string
}

interface ResUser {
  id: string
  name: string
  email: string
  token: string
  avatar: string
  driver_license: string
}

interface ResData {
  user: ResUser
  token: string
}

interface SignInParams {
  email: string
  password: string
}

type SignIn = (credentials: SignInParams) => Promise<void>
type UpdateUser = (user: User) => Promise<void>
type SignOut = () => Promise<void>

interface AuthContext {
  user?: User
  signIn: SignIn
  signOut: SignOut
  updateUser: UpdateUser
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContext>(undefined)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<User>({} as User)

  const signIn: SignIn = async credentials => {
    try {
      const res = await api.post('/sessions/', credentials)
      const { user, token } = res.data as ResData

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const userCollection = database.get<UserModel>('users')
      let collectionId

      await database.write(async () => {
        const collectionsUser = await userCollection.create(newUser => {
          newUser.name = user.name
          newUser.user_id = user.id
          newUser.email = user.email
          newUser.token = user.token
          newUser.avatar = user.avatar
          newUser.driver_license = user.driver_license
        })

        collectionId = collectionsUser.id
      })

      setData({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        driver_license: user.driver_license,
        user_id: user.id,
        id: collectionId,
        token
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  const signOut: SignOut = async () => {
    try {
      const userCollection = database.get<UserModel>('users')

      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)

        await userSelected.destroyPermanently()
      })

      setData({} as User)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser: UpdateUser = async user => {
    try {
      const userCollection = database.get<UserModel>('users')

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id)

        await userSelected.update(userData => {
          userData.name = user.name
          userData.avatar = user.avatar
          userData.driver_license = user.driver_license
        })
      })

      setData(user)
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  useEffect(() => {
    ;(async () => {
      const userCollection = database.get<UserModel>('users')
      const res = await userCollection.query().fetch()

      if (res.length > 0) {
        const userData = res[0]._raw as unknown as User
        api.defaults.headers['Authorization'] = `Bearer ${userData.token}`
        setData(userData)
      }
    })()
  })

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContext => {
  const context = useContext(AuthContext)

  return context
}

export { useAuth, AuthProvider }
