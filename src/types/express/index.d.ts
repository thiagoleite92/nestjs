type requestUserExpansion = {
  id: string;
  role: string;
};

declare namespace Express {
  export interface Request {
    user?: requestUserExpansion;
  }
}
