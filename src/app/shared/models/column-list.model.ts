import { BitwiseOperator } from "../util/bitwise-operator.util";
import { BaseModel } from "./base.model";

export const enum ColumnStatus {
    ACTIVE,
    SYSTEM
}

const bitwiseOperator = new BitwiseOperator<ColumnStatus>();

export class ColumnList extends BaseModel {
    constructor(data: Partial<ColumnList>) {
        super(data);
        this.title = data.title || "New List";
    }

    title!: string;

    get isSystemGenerated(): boolean {
        return bitwiseOperator.hasValue(this.status, ColumnStatus.SYSTEM);
    }

    set isSystemGenerated(value: boolean) {
        if (value) {
            this.status = bitwiseOperator.setValue(this.status, ColumnStatus.SYSTEM);
        } else {
            this.status = bitwiseOperator.removeValue(this.status, ColumnStatus.SYSTEM);
        }
    }
}