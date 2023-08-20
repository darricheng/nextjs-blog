// 200
export const successBody = (data: any, results: number = 1) => {
  return {
    status: "success",
    results,
    data,
  };
};
export const successStatus = { status: 200 };
export const createdBody = (data: any) => {
  return {
    status: "created",
    data,
  };
};
export const createdStatus = { status: 201 };

// 400
export const invalidRequestBody = (message: string) => {
  return { status: "error", message };
};
export const invalidRequestStatus = { status: 400 };
export const notFoundBody = { status: "error", message: "Post not found" };
export const notFoundStatus = { status: 404 };

// 500
export const serverErrorBody = (e: any) => {
  return { status: "error", message: e.message };
};
export const serverErrorStatus = { status: 500 };
