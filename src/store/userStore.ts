import { Subject } from "rxjs"
import { User } from "../user/userService"
import { useState, useLayoutEffect } from "react"

let currentUser: User | undefined

const userSubject = new Subject<User>()

export function useSessionUser() {
  const [user, setUser] = useState(currentUser)

  useLayoutEffect(() => {
    userSubject.subscribe((newState) => {
      setUser(newState)
    })
  }, [])

  return user
}

export function updateSessionUser(user: User) {
  currentUser =  user
  userSubject.next(currentUser)
}

export function updateReceptor(user: User) {
  currentUser =  user
  userSubject.next(currentUser)
  console.log(user)
}

export function sendReceptor () {
  userSubject.subscribe((user) => {return user.id})
  
}


export function cleanupSessionUser() {
  currentUser = undefined
  userSubject.next(currentUser)
}