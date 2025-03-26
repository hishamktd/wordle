declare module 'better-sqlite3' {
  interface DatabaseOptions {
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
    verbose?: Function;
  }

  interface Database {
    name: string;
    readonly open: boolean;
    readonly inTransaction: boolean;
    readonly readonly: boolean;
    readonly memory: boolean;

    prepare<T = any>(sql: string): Statement<T>;
    transaction<T extends Function>(fn: T): T;
    exec(sql: string): this;
    pragma(source: string, options?: { simple?: boolean }): any;
    checkpoint(databaseName?: string): this;
    function(name: string, fn: Function): this;
    aggregate(name: string, options: { start?: any, step: Function, result?: Function }): this;
    loadExtension(path: string): this;
    close(): this;
    defaultSafeIntegers(toggleState?: boolean): this;
  }

  interface Statement<T = any> {
    readonly database: Database;
    readonly source: string;
    readonly reader: boolean;
    readonly readonly: boolean;

    run(...params: any[]): RunResult;
    get(...params: any[]): T;
    all(...params: any[]): T[];
    iterate(...params: any[]): IterableIterator<T>;
    pluck(toggleState?: boolean): this;
    expand(toggleState?: boolean): this;
    raw(toggleState?: boolean): this;
    bind(...params: any[]): this;
    columns(): ColumnDefinition[];
    safeIntegers(toggleState?: boolean): this;
  }

  interface RunResult {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  interface ColumnDefinition {
    name: string;
    column: string | null;
    table: string | null;
    database: string | null;
    type: string | null;
  }

  export default function(path: string | Buffer, options?: DatabaseOptions): Database;
}

