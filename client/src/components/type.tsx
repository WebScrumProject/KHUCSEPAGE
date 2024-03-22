export interface PListItem {
    title: string;
    category: string;
    writer: string;
    date: string;
    id: string;
    content: {
        image: string[];
        video: string[];
        text: string;
        file: string[];
    };
    recruit: {
        field: string;
        apply_cnt: number;
        cate_field: string;
    }[];
    deadline: string,
    is_done: boolean;
    apply: {
        id:string;
        date: string;
        fieldDetail: string;
        field: string;
        memo: string;
    }[];
}

export type PListState = PListItem[];