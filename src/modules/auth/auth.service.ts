import { User } from "./user.model";
import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../../utils/jwt";
import {
    RegisterDto,
    AuthResponseDto,
    LoginDto,
} from "./auth.dto";
import { toAuthUserDto } from "./auth.mapper";

class AuthService {

    async register(
        data: RegisterDto
    ): Promise<AuthResponseDto> {

        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        const user = await User.create(data);

        const token = generateToken({
            userId: user.id
        });

        return {
            token,
            user: toAuthUserDto(user),
        };
    }

    async login(data: LoginDto): Promise<AuthResponseDto> {
        const user = await User.findOne({
            email: data.email,
        }).select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isPasswordValid = await user.comparePassword(data.password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password");
        }

        const token = generateToken({
            userId: user.id,
        });

        return {
            token,
            user: toAuthUserDto(user),
        };
    }

    async getCurrentUser(userId: string) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return toAuthUserDto(user);
    }

}

export default new AuthService();