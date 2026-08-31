import { IDBPDatabase, openDB } from 'idb';
import { DbAdapter, DBSchema } from '@tdev-api/OfflineApi/Adapter';
import { Document, DocumentType } from '@tdev-api/document';
import { OfflineUser } from '@tdev-api/OfflineApi';

const withFallback = <T>(fn: () => Promise<T>, fallback: T = undefined as T) => {
    return fn().catch(() => fallback);
};

type InitStores = 'fsHandles' | 'documents' | 'studentGroups' | 'permissions' | 'users';
const DB_VERSION = 3 as const;

class IndexedDbAdapter implements DbAdapter {
    private dbName: string;
    private dbPromise: Promise<IDBPDatabase<DBSchema>>;
    readonly mode = 'indexedDB';

    constructor(dbName: string, initializeStores: boolean = false) {
        this.dbName = dbName;
        this.dbPromise = this.initDBWithMigration(initializeStores, ['gbsl-informatik-teaching-dev-db']);
    }

    private async initDBWithMigration(
        initializeStores: boolean,
        legacyDbNames: string[]
    ): Promise<IDBPDatabase<DBSchema>> {
        const db = await this.initDB(initializeStores);
        for (const legacyName of legacyDbNames) {
            if (legacyName === this.dbName) {
                continue;
            }
            try {
                await this.migrateFromLegacyDb(db, legacyName);
            } catch (e) {
                // Never let a failed migration break app startup
                console.error(`IndexedDB migration from "${legacyName}" failed`, e);
            }
        }
        return db;
    }

    private async databaseExists(name: string): Promise<boolean> {
        // indexedDB.databases() isn't in every older browser; if it's missing
        // we simply skip migration rather than risk creating the old DB as a side effect.
        if (typeof indexedDB.databases !== 'function') {
            return false;
        }
        const dbs = await indexedDB.databases();
        return dbs.some((d) => d.name === name);
    }

    private async migrateFromLegacyDb(newDb: IDBPDatabase<DBSchema>, legacyName: string): Promise<void> {
        const exists = await this.databaseExists(legacyName);
        if (!exists) {
            return;
        }

        const oldDb = await openDB(legacyName);

        try {
            const storeNames = Array.from(oldDb.objectStoreNames) as InitStores[];

            for (const storeName of storeNames) {
                if (!newDb.objectStoreNames.contains(storeName)) {
                    // Store doesn't exist in the new DB's schema (e.g. dev-only stores) - skip it.
                    continue;
                }

                const readTx = oldDb.transaction(storeName, 'readonly');
                const items = await readTx.store.getAll();
                const keys = await readTx.store.getAllKeys();
                await readTx.done;

                if (items.length === 0) {
                    continue;
                }

                const hasInlineKey = !!readTx.store.keyPath;
                const writeTx = newDb.transaction(storeName, 'readwrite');
                await Promise.all(
                    items.map((item, i) =>
                        hasInlineKey
                            ? writeTx.store.put(item)
                            : writeTx.store.put(item, keys[i] as IDBValidKey)
                    )
                );
                await writeTx.done;
            }
        } finally {
            oldDb.close();
        }

        await indexedDB.deleteDatabase(legacyName);
    }

    private async initDB(initializeStores: boolean): Promise<IDBPDatabase<DBSchema>> {
        return openDB<DBSchema>(this.dbName, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('fsHandles')) {
                    db.createObjectStore('fsHandles');
                }
                if (process.env.NODE_ENV !== 'production' || initializeStores) {
                    if (!db.objectStoreNames.contains('documents')) {
                        const store = db.createObjectStore('documents', { keyPath: 'id' });
                        store.createIndex('documentRootId', 'documentRootId', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('studentGroups')) {
                        db.createObjectStore('studentGroups', { keyPath: 'id' });
                    }
                    if (!db.objectStoreNames.contains('permissions')) {
                        db.createObjectStore('permissions', { keyPath: 'id' });
                    }
                    if (!db.objectStoreNames.contains('users')) {
                        db.createObjectStore('users', { keyPath: 'id' });
                    }
                }
            }
        });
    }

    async get<T>(storeName: InitStores, id: string): Promise<T | undefined>;
    async get<T>(storeName: string, id: string): Promise<T | undefined>;
    async get<T>(storeName: InitStores | string, id: string): Promise<T | undefined> {
        return withFallback(async () => {
            const db = await this.dbPromise;
            return db.get(storeName, id) as Promise<T | undefined>;
        });
    }

    async byDocumentRootId<T extends DocumentType>(
        documentRootId: string | null | undefined
    ): Promise<Document<T>[]> {
        if (!documentRootId) {
            return Promise.resolve([]);
        }
        return withFallback(async () => {
            const db = await this.dbPromise;
            const index = db.transaction('documents', 'readonly').store.index('documentRootId');
            const docs = (await index.getAll(documentRootId)) as Document<T>[];
            return docs;
        }, []);
    }

    async getAll<T>(storeName: string): Promise<T[]> {
        return withFallback(async () => {
            const db = await this.dbPromise;
            return db.getAll(storeName) as Promise<T[]>;
        }, []);
    }
    async put<T>(storeName: string, item: T, id: IDBKeyRange | IDBValidKey): Promise<void>;
    async put<T>(storeName: string, item: T & { id: string }): Promise<void>;
    async put<T>(
        storeName: string,
        item: (T & { id: string }) | T,
        id?: IDBKeyRange | IDBValidKey
    ): Promise<void> {
        return withFallback(async () => {
            const db = await this.dbPromise;
            await db.put(storeName, item, id);
        });
    }

    async delete(storeName: InitStores, id: string): Promise<void>;
    async delete(storeName: string, id: string): Promise<void>;
    async delete(storeName: string | InitStores, id: string): Promise<void> {
        return withFallback(async () => {
            const db = await this.dbPromise;
            await db.delete(storeName, id);
        });
    }

    async destroyDb(): Promise<void> {
        return withFallback(async () => {
            const db = await this.dbPromise;
            await db.close();
            // Optionally delete the database
            await indexedDB.deleteDatabase(this.dbName);
        });
    }
    async exportDb(): Promise<{ [storeName: string]: any }> {
        return withFallback(async () => {
            const db = await this.dbPromise;
            const exportData: { [storeName: string]: any } = {};
            for (const storeName of ['documents', 'studentGroups', 'permissions']) {
                exportData[storeName] = await db.getAll(storeName);
            }
            // Here you can handle the exportData, e.g., save it to a file or send it to a server
            return exportData;
        });
    }
    async importDb(data: { [storeName: string]: any }): Promise<void> {
        const hasUser = data['user'];
        let needsCleanup = false;
        if (hasUser) {
            const user = data['user'];
            const current = OfflineUser.getUser();
            if (!current || current.id !== user.id) {
                needsCleanup = true;
            }
            OfflineUser.setUser(user);
        }
        return withFallback(async () => {
            const db = await this.dbPromise;
            if (needsCleanup) {
                await db.clear('users');
                await db.clear('documents');
                await db.clear('studentGroups');
                await db.clear('permissions');
            }
            for (const storeName of Object.keys(data)) {
                if (storeName === 'user') {
                    await db.put('users', data['user']);
                }
                if (!db.objectStoreNames.contains(storeName)) {
                    continue;
                }
                const items = data[storeName];
                for (const item of items) {
                    await db.put(storeName, item);
                }
            }
        });
    }
}

export default IndexedDbAdapter;
