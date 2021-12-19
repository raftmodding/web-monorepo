// noinspection JSUnusedGlobalSymbols

declare module 'finale-rest' {
  import { Express, Request, Response, Router } from 'express';
  import { Sequelize } from 'sequelize';

  function initialize(options: InitializeOptions): Finale;

  function resource(options: ResourceOptions): Resource;

  interface Finale {}

  class Resource implements ResourceOptions {
    app?: Express | Router;
    sequelize?: Sequelize;
    model: any;
    endpoints?: string[];
    actions?: Array<'create' | 'read' | 'update' | 'delete' | 'list'>;
    include?: any[];
    pagination?: boolean;
    updateMethod?: 'POST' | 'PUT' | 'PATCH';
    search?: SearchOptions | SearchOptions[];
    sort?: SortOptions;
    reloadInstances?: boolean;
    associations?: boolean;
    excludeAttributes?: string[];
    readOnlyAttributes?: string[];
    associationOptions: any;
    attributes: any;
    projects: any;
    controllers: any;
    create: Controllers.create;
    read: Controllers.read;
    update: Controllers.update;
    delete: Controllers.update;
    list: Controllers.list;
    all: Controllers.all;
    associationsInfo: any;
    use: any;
  }

  export namespace Controllers {
    class base {
      static hooks: string[];
      static milestones: string[];

      start: Hook;
      auth: Hook;
      data: Hook;
      send: Hook;
      complete: Hook;

      constructor(args: any);
    }

    class create extends base {
      write: Hook;

      constructor(args: any);
    }

    class list extends base {
      fetch: Hook;

      constructor(args: any);
    }

    class read extends base {
      fetch: Hook;

      constructor(args: any);
    }

    class update extends base {
      fetch: Hook;
      write: Hook;

      constructor(args: any);
    }

    class all extends base {
      fetch: Hook;
      write: Hook;

      constructor(args: any);
    }
  }

  interface Hook {
    before: (hook: Handler) => void;
    after: (hook: Handler) => void;

    (hook: Handler): void;
  }

  type Handler = (
    req: Request,
    res: Response,
    context: Context,
  ) => Promise<any>;

  interface Context {
    skip: Promise<any>;
    stop: Promise<any>;
    continue: Promise<any>;
    error: Promise<any>;
    criteria: any;
    attributes: any;
    options: any;
  }

  export namespace Errors {
    class FinaleError {
      constructor(status: any, message: any, errors: any, cause: any);
    }

    class BadRequestError {
      constructor(message: any, errors: any, cause: any);
    }

    class ForbiddenError {
      constructor(message: any, errors: any, cause: any);
    }

    class NotFoundError {
      constructor(message: any, errors: any, cause: any);
    }

    class RequestCompleted {}
  }

  interface InitializeOptions {
    app: Express | Router;
    sequelize: Sequelize;
    base?: string;
    updateMethod?: 'POST' | 'PUT' | 'PATCH';
  }

  interface ResourceOptions {
    app?: Express | Router;
    sequelize?: Sequelize;
    model: any;
    endpoints?: string[];
    actions?: Array<'create' | 'read' | 'update' | 'delete' | 'list'>;
    include?: any[];
    pagination?: boolean;
    updateMethod?: 'POST' | 'PUT' | 'PATCH';
    search?: SearchOptions | SearchOptions[];
    sort?: SortOptions;
    reloadInstances?: boolean;
    associations?: boolean;
    excludeAttributes?: string[];
    readOnlyAttributes?: string[];
  }

  interface SearchOptions {
    operator:
      | '$like'
      | '$ilike'
      | '$iLike'
      | '$notLike'
      | '$notILike'
      | '$ne'
      | '$eq'
      | '$not'
      | '$gte'
      | '$gt'
      | '$lte'
      | '$lt';
    param: string;
    attributes: string[];
  }

  interface SortOptions {
    param: string;
    attributes: string[];
    default: string;
  }
}
