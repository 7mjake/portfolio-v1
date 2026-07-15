export declare function normalizeNeonHost(hostname: string): string
export declare function validateDatabasePair(env: Record<string, string | undefined>): { runtime: URL; direct: URL }
export declare function validateResourceIsolation(env: Record<string, string | undefined>): { runtimeHost: string; directHost: string }
