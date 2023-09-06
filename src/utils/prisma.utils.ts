type prismaSelectType = (string | object)[] | null;

export const selectBuilder = (select: prismaSelectType) => {

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

export const includeBuilder = (include: prismaSelectType) => {

    if ( include === null ) 
        return null;

    let includeObj = {};

}