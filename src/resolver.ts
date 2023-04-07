export interface Error {
  message: string
  type?: string
}

export type Errors = Record<string, Error[]>;

export interface ResolverResult {
  values: any
  errors: Errors
}

export type Resolver = (values: any) => Promise<ResolverResult>;
