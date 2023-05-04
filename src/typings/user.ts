export interface User {
    id: number
    created_at: Date
    updated_at: Date
    username: string
    first_name: string
    last_name: string
    email: string
    phone: string
    birth_date: string | null
    password: string
    is_superuser: boolean
}
