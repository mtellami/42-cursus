import { JwtUser } from "datatype/jwt.user.dto";
import { Request } from "express";

export type RequestAndJwtUser = Request & { user: JwtUser };
