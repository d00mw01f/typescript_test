export enum TEXT_NODE_TYPE {
    NAME,
    LEFT_PARENTHESIS,
    RIGHT_PARENTHESIS,
    COLON,
}

export class TextNode {
    private type: TEXT_NODE_TYPE;
    private text: string;

    constructor(text: string, type: TEXT_NODE_TYPE) {
        this.text = text;
        this.type = type;
    }

    public getType(): TEXT_NODE_TYPE {
        return this.type;
    }

    public getText(): string {
        return this.text;
    }
}
