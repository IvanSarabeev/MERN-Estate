import { CurrentUserInterface } from "./user"

export interface ReduxUserState extends CurrentUserInterface {
    currentUser: CurrentUserInterface | null,
    error: string | null,
    loading: boolean | undefined,
}