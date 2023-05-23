import { http } from "@/utils/http";

type Result = {
  code: number;
  message: string;
  data: object;
};

export function loginByPassword(data?: object): Promise<Result> {
  return http.request({
    url: "/auth/login",
    method: "post",
    data
  });
}
