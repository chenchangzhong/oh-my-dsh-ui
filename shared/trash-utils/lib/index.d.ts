import { tmpdir } from 'node:os';
/**
 * 把目录移入系统回收站。
 * @param path - 绝对目录路径。
 * @returns { ok: true; location: string } 成功；失败抛出 Error。
 */
export declare function trashItem(path: string): Promise<{
    ok: true;
    location: string;
}>;
/**
 * 把目录从回收站恢复回原路径。
 * @param location - trashItem 返回的位置（win32 传原路径）。
 * @param originalPath - 恢复目标原路径。
 */
export declare function restoreItem(location: string, originalPath: string): Promise<void>;
export { tmpdir as _tmpdir };
