import { nanoid } from "nanoid";

export abstract class BaseModel {
    
    constructor(data: Partial<BaseModel>) {
        this.id = data.id || nanoid();
        this.createdAt = data.createdAt || new Date();
        this.updatedAt == data.updatedAt || new Date();
        this.deletedAt = data.deletedAt || null;
        this.status = data.status || 1;
    }

    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date | null;
    status!: number;
}