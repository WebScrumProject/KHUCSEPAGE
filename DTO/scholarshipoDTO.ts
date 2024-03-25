const scholarshipModel = require('../models/scholarshipSchema.tsx');

export async function getList(page: string) {
    let itemsPerPage = 10;
    let page_int = parseInt(page, 10);
    let skip = (page_int - 1) * itemsPerPage;
    try {
        const result = await scholarshipModel
            .find({})
            .sort({ _id: -1 })
            .skip(skip)
            .limit(itemsPerPage)
            .exec();
        return result;
    } catch (err) {
        console.error(err);
        throw new Error('장학 목록 데이터 가져오기에 실패했습니다.');
    }
}


export async function getDetail(id:number) {
    var skip_number:number, limit_number:number
    if(id==0){
        skip_number = id
        limit_number = 2
    }
    else if (id==499){
        skip_number =  id-1
        limit_number = 2
    }
    else{
        skip_number = id-1
        limit_number = 3
    }
    try {
        const result = await scholarshipModel
            .find({})
            .sort({_id:-1})
            .skip(skip_number)
            .limit(limit_number)
            .exec()
        return result;
    } catch (err) {
        console.error(err);
        throw new Error('장학 상세 데이터 가져오기에 실패했습니다.');
    }
}