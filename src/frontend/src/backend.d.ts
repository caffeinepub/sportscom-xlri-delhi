import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface GalleryImage {
    id: string;
    blob: ExternalBlob;
    imageLabel: string;
    category: GalleryCategory;
    orderIndex: bigint;
}
export interface UserProfile {
    name: string;
}
export enum GalleryCategory {
    xpl = "xpl",
    northernBrawl = "northernBrawl",
    captainsAnnouncement = "captainsAnnouncement",
    ratanjee = "ratanjee"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addImage(image: GalleryImage): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteImage(id: string): Promise<void>;
    getAllImages(): Promise<Array<GalleryImage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getImagesByCategory(category: GalleryCategory): Promise<Array<GalleryImage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateImage(image: GalleryImage): Promise<void>;
}
