export enum RoleEnum {
  Assistant = "assistant",
  User = "user",
  System = "system",
}
export interface MessageType {
  role: RoleEnum;
  id: string;
  createAt?: number;
  content?: string;
  status?: string;
}
export enum StatusEnum {
  Success = "success",
  Err = "error",
  Loading = "loading",
}
