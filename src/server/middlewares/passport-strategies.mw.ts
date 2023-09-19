import * as passport from "passport";
import * as PassportLocal from "passport-local";
import * as PassportJWT from "passport-jwt";
import Authors from "../db/queries/author";
import { Application } from "express";
import { jwtconfig } from "../config";
import { compareHash } from "../utils/password";
