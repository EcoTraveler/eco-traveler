import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface User {
  _id: string
  name: string
  username: string
  email: string
  imgUrl: string
}

interface EditProfileFormProps {
  user: User
  onUpdate: (updatedUser: Partial<User>) => void
  onCancel: () => void
}

export default function EditProfileForm({ user, onUpdate, onCancel }: EditProfileFormProps) {
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [imgUrl, setImgUrl] = useState(user.imgUrl)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ name, username, email, imgUrl })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="imgUrl">Profile Image URL</Label>
        <Input
          id="imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}