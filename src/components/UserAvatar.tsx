"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

export default function UserAvatar() {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png"/>
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </>
  )
}
