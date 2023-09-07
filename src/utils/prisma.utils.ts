type prismaSelectType = (string | object)[] | null;

const selectBuilder = (select: prismaSelectType) => {

    if ( select === null ) 
        return null;


    let selectObj = {};
    
    select.forEach((field) => {
        if ( typeof field === "string" ) {
            // @ts-ignore
            selectObj[field] = true;
        } else {
            for (const [key, value] of Object.entries(field)) {
                // @ts-ignore
                selectObj[key] = {
                    'select': selectBuilder(value)
                }
            }
        }
    });

    return selectObj;
};

const includeBuilder = (include: prismaSelectType) => {

    if ( include === null ) 
        return null;

    let includeObj = {};
    include.forEach((field) => {
        if ( typeof field === "string" ) {
            // @ts-ignore
            includeObj[field] = true;
        } else {
            for (const [key, value] of Object.entries(field)) {
                // @ts-ignore
                includeObj[key] = {
                    'include': includeBuilder(value)
                }
            }
        }
    });

}

export const buildOptions = (options: any) => {

    options.select = selectBuilder(options.select);
    options.include = includeBuilder(options.include);

    return options;

}