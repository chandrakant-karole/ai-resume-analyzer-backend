import { AuthUserDto } from "./auth.dto";

export const toAuthUserDto = (user: AuthUserDto) => ({
    id: user.id,
    name: user.name,
    email: user.email,
});