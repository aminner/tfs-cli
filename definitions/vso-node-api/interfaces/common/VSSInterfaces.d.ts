export interface IdentityRef {
    displayName: string;
    id: string;
    imageUrl: string;
    isAadIdentity: boolean;
    isContainer: boolean;
    profileUrl: string;
    uniqueName: string;
    url: string;
}
export interface JsonPatchDocument {
}
export interface JsonPatchOperation {
    from: string;
    op: Operation;
    path: string;
    value: any;
}
export declare enum Operation {
    Add = 0,
    Remove = 1,
    Replace = 2,
    Move = 3,
    Copy = 4,
    Test = 5,
}
export interface ResourceRef {
    id: string;
    url: string;
}
export interface VssJsonCollectionWrapper extends VssJsonCollectionWrapperBase {
    value: any[];
}
export interface VssJsonCollectionWrapperV<T> extends VssJsonCollectionWrapperBase {
    value: T;
}
export interface VssJsonCollectionWrapperBase {
    count: number;
}
export declare var TypeInfo: {
    IdentityRef: {
        fields: any;
    };
    JsonPatchDocument: {
        fields: any;
    };
    JsonPatchOperation: {
        fields: any;
    };
    Operation: {
        enumValues: {
            "add": number;
            "remove": number;
            "replace": number;
            "move": number;
            "copy": number;
            "test": number;
        };
    };
    OperationReference: {
        fields: any;
    };
    ResourceRef: {
        fields: any;
    };
    VssJsonCollectionWrapper: {
        fields: any;
    };
    VssJsonCollectionWrapperV: {
        fields: any;
    };
    VssJsonCollectionWrapperBase: {
        fields: any;
    };
};