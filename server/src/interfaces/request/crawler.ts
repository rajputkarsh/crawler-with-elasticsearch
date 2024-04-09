import { Request } from "express";

export interface ICrawlerRequest extends Request {
  body: {
    url: string
  }
}