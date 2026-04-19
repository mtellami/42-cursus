
export const generateRandomNameSuffix = (len: number): string => {
    const   chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let     suffix = '';

    for (let i = 0; i < len; ++i) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return suffix === '' ? '' : ('-' + suffix);
}

export const generatorTwofaCode = (): string => {
    const digits = '0123456789';
    let code: string = '';

    for (let i = 0; i < 6; ++i) {
        code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return code;
}

export const stringIsUUID = (str: string): boolean => {
    const uuidRegex = (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
    return str?.match(uuidRegex) || false ? true : false ;
}


export const stringIsNotUUID = (str: string): boolean => {
    const uuidRegex = (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
    return str?.match(uuidRegex) || false ? false : true ;
}
