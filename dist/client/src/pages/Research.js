"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_redux_1 = require("react-redux");
const professor_1 = require("../store/professor");
const react_router_dom_1 = require("react-router-dom");
const Research_module_css_1 = __importDefault(require("../styles/Research.module.css"));
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
require("../styles/Paging.css");
// import Pagination from "react-js-pagination"
// import { ObjectId } from 'mongodb';
function Research() {
    let professor = (0, react_redux_1.useSelector)((state) => state.professor);
    // const proId = professor?.id <- typescript에서 redux의 state 부르는 방법 알압괴
    let dispatch = (0, react_redux_1.useDispatch)();
    let navigate = (0, react_router_dom_1.useNavigate)();
    let [page, setPage] = (0, react_1.useState)(1); // 현재 페이지
    let [count, setCount] = (0, react_1.useState)(0); // 카드의 개수
    const prevPage = (() => { setPage(page - 1); });
    const nextPage = (() => { setPage(page + 1); });
    // const fetchUndergraduatePage = async () => {
    //     try {
    //       const res = await axios.get(`/undergraduate_student?page=${page}`);
    //       navigate('/research')
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    const fetchUndergraduateInfo = async () => {
        try {
            const res = await axios_1.default.get(`/undergraduate_student?page=${page}/info`);
            navigate('/research');
            const info_count = res.data;
            setCount(info_count.length);
            res.data.map((a, i) => {
                dispatch((0, professor_1.addProfessor)(a));
            });
            console.log(res.data);
            console.log('카드 개수 : ', count);
            window.scrollTo(0, 0);
        }
        catch (error) {
            console.error(error);
        }
    };
    // 삭제할 때마다 axios.delete
    const deleteUndergraduate = (i) => {
        if (window.confirm('정말 삭제할까요?')) {
            axios_1.default.delete(`/undergraduate_student/${i}`)
                .then((res) => {
                dispatch((0, professor_1.deleteProfessor)(i));
                alert('삭제되었습니다.');
            })
                .catch((err) => {
                console.log(err);
            });
        }
    };
    // const handlePageChange = (page: number) => {
    //     setPage(page)
    // }
    // useEffect(() => {
    //     // fetchUndergraduatePage()
    //     fetchUndergraduateInfo()
    // }, [page])
    // 그 카드의 상세페이지로 이동할 때 axios.get
    const selectCard = (id, name) => {
        return {
            type: 'SELECT_CARD',
            payload: { id, name }
        };
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: Research_module_css_1.default.add_professor, onClick: () => { navigate('/addProfessor'); }, children: " \uD398\uC774\uC9C0 \uCD94\uAC00 " }), (0, jsx_runtime_1.jsx)("div", { className: Research_module_css_1.default.research_container, children: professor.map((a, i) => {
                    return ((0, jsx_runtime_1.jsxs)("div", { className: Research_module_css_1.default.research_box, children: [(0, jsx_runtime_1.jsxs)("div", { className: Research_module_css_1.default.research_profile, children: [(0, jsx_runtime_1.jsx)("div", { className: Research_module_css_1.default.research_picture }), (0, jsx_runtime_1.jsxs)("p", { children: [a.profName, " \uAD50\uC218\uB2D8"] }), (0, jsx_runtime_1.jsx)("p", { children: a.profPhone })] }), (0, jsx_runtime_1.jsxs)("div", { className: Research_module_css_1.default.research_content, children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\uBAA8\uC9D1 \uC778\uC6D0 : ", a.recNumber, "\uBA85"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uAE30\uAC04 : ", a.recDate] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uC5F0\uAD6C \uBD84\uC57C : ", a.profMajor] })] }), (0, jsx_runtime_1.jsxs)("div", { className: Research_module_css_1.default.button_container, children: [(0, jsx_runtime_1.jsx)("button", { type: 'submit', className: Research_module_css_1.default.delete_button, onClick: () => {
                                            var id = a._id;
                                            deleteUndergraduate(i);
                                        }, children: " - " }), (0, jsx_runtime_1.jsx)("button", { type: 'submit', className: Research_module_css_1.default.detail_button, onClick: () => {
                                            var id = a._id;
                                            navigate(`/detail/${id}`);
                                        }, children: " + " })] })] }));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: Research_module_css_1.default.pagination, children: [(0, jsx_runtime_1.jsx)("button", { className: Research_module_css_1.default.prev_btn, onClick: prevPage, style: { opacity: page !== 1 ? 1 : 0, pointerEvents: page !== 1 ? 'auto' : 'none' }, children: "\uC774\uC804" }), (0, jsx_runtime_1.jsxs)("p", { className: Research_module_css_1.default.page_num, children: [page, "\uD398\uC774\uC9C0"] }), (0, jsx_runtime_1.jsx)("button", { className: Research_module_css_1.default.next_btn, onClick: nextPage, children: "\uB2E4\uC74C" })] })] }));
}
exports.default = Research;
